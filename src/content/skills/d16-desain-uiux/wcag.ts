export function normalizeHex(hex:string):string {
 const clean=hex.trim().replace(/^#/,'');
 if (!/^[0-9a-fA-F]{6}$/.test(clean)) throw new Error(`Hex tidak valid: ${hex}`);
 return clean.toLowerCase();
}
export function relativeLuminance(hex:string):number {
 const c=normalizeHex(hex);
 const rgb=[0,2,4].map((i)=>parseInt(c.slice(i,i+2),16)/255).map((v)=>v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4));
 return 0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];
}
export function contrastRatio(foreground:string,background:string):number {
 const a=relativeLuminance(foreground), b=relativeLuminance(background);
 const light=Math.max(a,b), dark=Math.min(a,b);
 return (light+0.05)/(dark+0.05);
}
export function requiredContrast(fontSizePx:number,isBold=false,largeText=false):number {
 if (largeText || (!isBold && fontSizePx>=24) || (isBold && fontSizePx>=18.66)) return 3;
 return 4.5;
}
export function wcagPass(foreground:string,background:string,fontSizePx:number,isBold=false):boolean {
 return contrastRatio(foreground,background)>=requiredContrast(fontSizePx,isBold);
}
