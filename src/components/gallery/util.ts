export function getImageUrl(id: string, variant: 'small' | 'public') {
  return `https://imagedelivery.net/Xr6R4HJCyIboUOuIQ8YaiQ/${id}/${variant}`;
}

export function getCdnImage(id: string) {
  const smallUrl = getImageUrl(id, 'small');
  const publicUrl = getImageUrl(id, 'public');
  const sizes = '(max-width: 600px) 480px, 800px';
  const srcset = `${smallUrl} 480w, ${publicUrl} 800w`;
  return { smallUrl, publicUrl, sizes, srcset };
}

function getIndexOfSmallest(list: number[]) {
  if (!list || !list.length) {
    throw new Error('invalid array length');
  }

  let ret = 0;
  for (let i = ret + 1; i < list.length; i += 1) {
    const l1 = list[i];
    const l2 = list[ret];
    if (l1 !== undefined && l2 !== undefined && l1 < l2) {
      ret = i;
    }
  }
  return ret;
}

export function distributeEvenHeightColumns<
  T extends { width: number; height: number }
>(images: T[], num: number) {
  // pretend this is the width of the rendered column, to calculate aspect ratio
  const VIRTUAL_WIDTH = 512;
  // build map
  const columns: T[][] = Array(num);
  for (let i = 0; i < num; i += 1) {
    columns[i] = [];
  }
  const height = Array(num).fill(0);

  // distribute
  images.forEach((i) => {
    const ratio = i.width / i.height;
    const renderedHeight = VIRTUAL_WIDTH / ratio;

    const index = getIndexOfSmallest(height);
    const col = columns[index];
    if (!col) {
      return;
    }
    col.push(i);
    height[index] += renderedHeight;
  });

  return columns;
}
