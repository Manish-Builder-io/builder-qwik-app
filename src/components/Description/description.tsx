import { component$ } from "@builder.io/qwik";

export const Description = component$((props: { description: string }) => {
  return (
    <div>
      <h3>{props.description}</h3>
    </div>
  );
});