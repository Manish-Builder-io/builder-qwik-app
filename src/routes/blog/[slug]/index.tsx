import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getContent } from "@builder.io/sdk-qwik";
import Detail from "~/components/blog/detail";
// import Recent from "~/components/blog/recent";

export const useArticle = routeLoader$(async (requestEvent) => {
  const res = await getContent({
    model: 'blog-article',
    apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
    query: {
      "data.slug": requestEvent.params.slug,
      //cacheSeconds: 60, // 1 week
    },
    options: {includeUnpublished: true}
  });
  return res;
});

export default component$(() => {
  const article = useArticle();

  return (
    <div class="flex flex-col-reverse md:flex-row">
      <div class="flex-1 mt-8 px-4 flex flex-col w-full items-center max-w-4xl">
        {/* <Recent skipArticleTitle={article.value?.data?.title} /> */}
      </div>
      <Detail article={article} />
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const article = resolveValue(useArticle);
  return {
    title: `${article?.data?.title} | Peeplee`,
    meta: [
      {
        name: "description",
        content: article?.data?.title,
      },
    ],
  };
};
