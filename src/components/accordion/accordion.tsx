import { component$, Slot } from '@builder.io/qwik';

interface AccordionProps {
  class?: string;
  title?: string;
  items: AccordionItemProps[];
}

interface AccordionItemProps {
  title: string;
  content: string;
}

export const AccordionWithItems = component$<AccordionProps>((props: AccordionProps) => {
  return (
    <div class={props.class}>
      {props.title && (
        <p>
          <strong>{props.title}</strong>
        </p>
      )}
      {props.items.map((item, index) => (
          <details key={index}>
            <summary>{item.title}</summary>
            <div>
              {item.content}
            </div>
        </details>
      ))}
    </div>
  );
});


export default AccordionWithItems;