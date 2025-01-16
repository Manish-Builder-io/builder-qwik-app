import { component$ } from "@builder.io/qwik";

export const HeadingH3 = component$((props: { title: string }) => {
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  );
});