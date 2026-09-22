export function Figure({
  shot,
}: {
  shot: { src: string; alt: string; width: number; height: number; caption: string };
}) {
  return (
    <figure className="figure">
      <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}
