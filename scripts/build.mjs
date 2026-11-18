import {cpSync,mkdirSync,rmSync} from 'node:fs';
rmSync('dist',{recursive:true,force:true});mkdirSync('dist',{recursive:true});cpSync('web','dist',{recursive:true});cpSync('promotion/2026-11-18/推薦貼文.txt','dist/social/chinese-game-hub-post.txt');console.log('國語遊戲集合站靜態網站建置完成。');
