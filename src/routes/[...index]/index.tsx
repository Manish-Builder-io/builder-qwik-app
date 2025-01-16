import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { routeLoader$ } from '@builder.io/qwik-city'
import {
  fetchOneEntry,
  Content,
  getBuilderSearchParams,
} from '@builder.io/sdk-qwik'
import { CUSTOM_COMPONENTS } from '../../components/builder-registry'
import Hero from '~/components/Hero/Hero';

type Model = 'page' | 'article-page'
const locale = "fr-FR";

const getBuilderContent = async (model: Model, url: URL) => {
  return fetchOneEntry({
    model,
    apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
      locale: locale,
    },
    locale: locale,
  })
}

// This page is a catch-all for all routes that don't have a pre-defined route.
// Using a catch-all route allows you to dynamically create new pages in Builder.

// Use the `useBuilderContent` route loader to get your content from Builder.
// `routeLoader$()` takes an async function to fetch content
// from Builder with using `getContent()`.
export const useBuilderContent = routeLoader$(async ({ url, error }) => {
  const isPreviewing = url.searchParams.has('builder.preview')

  // Fetch Builder.io Visual CMS content using the Qwik SDK.
  // The public API key is set in the .env file at the root
  // https://www.builder.io/c/docs/using-your-api-key

  let model: Model = 'page'
  let builderContent = await getBuilderContent(model, url)

  // If there's no page content, try fetching content for the "article-page" model
  if (!builderContent) {
    model = 'article-page'
    builderContent = await getBuilderContent(model, url)
  }

  // If there's no content, throw a 404.
  // You can use your own 404 component here
  if (!builderContent && !isPreviewing) {
    throw error(404, `Page not found ${url.pathname}`)
  }

  // return content fetched from Builder, which is JSON
  return { builderContent, model }
})

export default component$(() => {
  const signal = useBuilderContent()

  const { builderContent, model } = signal.value

  const heroData = builderContent?.data?.hero || {}

  // Assuming the 'hero' object contains the needed fields
  const heroProps = {
    title: heroData.title || 'Default Title',
    description: heroData.description || 'Default description',
    backgroundImage: heroData.backgroundImage || 'https://example.com/default-background.jpg',
    ctaText: heroData.ctaText || 'Learn More',
    ctaLink: heroData.ctaLink || '/default-link',
  }

  const faq = {
    items: [
      {
        title: "What is Builder.io?",
        description: "Builder.io is a headless CMS with a visual editor for improving content management and production speed."
      },
      {
        title: "How does Builder.io integrate with my tech stack?",
        description: "Builder.io uses simple SDK or API integrations, allowing it to work seamlessly with any tech stack for rapid creation of rich experiences."
      },
      {
        title: "What are section models in Builder.io?",
        description: "Section models in Builder.io are used to create reusable content sections that can be managed in the Visual Editor and used across multiple pages."
      }
    ]
  };

  // Content component uses the `content` prop to render
  // the page, specified by the API Key, at the current URL path.
  if (model === 'article-page') {
    return (
      <div>
        <Content
          model={'article-page'}
          content={builderContent}
          apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
          customComponents={CUSTOM_COMPONENTS}
          locale={locale}
          
        />
      </div>
    )
  }
  return (
    <>
    <Hero {...heroProps} />
    <Content
      model={'page'}
      content={builderContent}
      apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
      customComponents={CUSTOM_COMPONENTS}
      data={{faq}}
    />
    </>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const { builderContent } = resolveValue(useBuilderContent)
  return {
    title: builderContent?.data?.title,
  }
}