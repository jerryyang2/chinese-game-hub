// Usage: node scripts/render-social-poster.mjs <directory containing @resvg/resvg-js>
// Illustration is used unchanged in an authored SVG layout; QR is generated separately.
import {readFileSync,writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(resolve(process.argv[2]||root,'package.json'));
const {Resvg}=require('@resvg/resvg-js');
const source=resolve(root,'promotion/2026-11-18/poster.svg');
let svg=readFileSync(source,'utf8');
svg=svg.replace(/xlink:href="([^"]+)"/g,(_,name)=>`xlink:href="data:image/png;base64,${readFileSync(resolve(dirname(source),name)).toString('base64')}"`);
const fonts=process.env.POSTER_FONT?[process.env.POSTER_FONT]:['/System/Library/Fonts/STHeiti Medium.ttc','/System/Library/Fonts/Supplemental/Arial.ttf'];
for(const [width,file] of [[1080,'chinese-game-hub-social.png'],[2160,'chinese-game-hub-social-2x.png']]){
 const result=new Resvg(svg,{fitTo:{mode:'width',value:width},font:{fontFiles:fonts,loadSystemFonts:true,defaultFontFamily:'Heiti TC'}}).render();
 writeFileSync(resolve(root,'web/social',file),result.asPng());
 console.log(`${file}: ${result.width} × ${result.height}`);
}
