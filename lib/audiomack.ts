/** The play button and waveform end around 249px. A frame that short clips them.
 * The album list is pinned to the iframe bottom, so the frame has to be tall
 * enough for that list as well, or the list covers the controls. */
const head = 300;

export function audiomackHeight(song: boolean, tracks: number) {
  if (song) return head;
  return head + Math.max(tracks, 1) * 72 + 28;
}
