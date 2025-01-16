import type { Signal } from "@builder.io/qwik";
import { component$, Resource } from "@builder.io/qwik";
import { Content } from "@builder.io/sdk-qwik";
import type { BuilderContent } from "@builder.io/sdk-qwik/types/types/builder-content";

type Props = {
  article: Signal<null | BuilderContent>;
};

export default component$(({ article }: Props) => {
  return (
    <div class="flex-[1.2] mx-auto mr-2 max-w-full" data-theme="cupcake" id="blog">
      <h1 class="text-4xl md:text-5xl pt-4 md:pt-8 pb-4 md:pb-12 max-w-3xl font-medium font-poppins px-4 text-balance tracking-wide">
        {article.value?.data?.title}
      </h1>
      <div class="w-full px-4 my-8 overflow-hidden">
        <img
          srcSet={`${article.value?.data?.image}?height=350&width=500&format=webp 500w,
      ${article.value?.data?.image}?height=550&width=1000&format=webp 1000w,
      ${article.value?.data?.image}?height=1125&width=2000&format=webp 2000w,`}
          src={`${article.value?.data?.image}?height=1125&width=2000&format=webp`}
          alt={article.value?.data?.title}
          class="bg-cover max-w-full  bg-center rounded-xl"
          height={325}
          width={1200}
        />
      </div>
      <div class="max-w-3xl min-h-screen">
        <Resource
          value={article}
          onPending={() => <div>Loading...</div>}
          onResolved={(content) => (
            <Content model="blog-article" content={content} apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY} />
          )}
        />
      </div>
    </div>
  );
});
