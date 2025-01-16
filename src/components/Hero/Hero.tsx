import { component$ } from "@builder.io/qwik";

interface HeroProps {
  title: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export default component$<HeroProps>((props) => {
  const {
    title,
    description,
    backgroundImage,
    ctaText,
    ctaLink
  } = props;

  return (
    <section style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '4rem 2rem',
      color: '#fff',
      textAlign: 'center',
      height: '100vh',
    }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <a href={ctaLink} style={{
        display: 'inline-block',
        padding: '0.75rem 1.5rem',
        marginTop: '1rem',
        backgroundColor: '#007BFF',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
      }}>
        {ctaText}
      </a>
    </section>
  );
});