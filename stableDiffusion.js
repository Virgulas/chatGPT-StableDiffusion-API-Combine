const http = require('node:http');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const artMaker = async (prompt) => {
  const postData = JSON.stringify({
    "enable_hr": true,
    "denoising_strength": .6,
    "hr_scale": 2,
    "hr_upscaler": "Latent",
    "hr_second_pass_steps": 40,
    "prompt": prompt,
    "steps": 20,
    "negative_prompt": "(low quality, worst quality:1.4), (bad anatomy), (inaccurate limb:1.2),bad composition, inaccurate eyes, extra digit, fewer digits,(extra arms:1.2)",
  });

  const options = {
    hostname: '127.0.0.1',
    port: 7860,
    path: '/sdapi/v1/txt2img',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
    },
  };

  const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
    
      res.on('end', () => {
        makeImage(JSON.parse(responseData));
      });
    });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  const makeImage = async (r) => {
      for (const i of r['images']) {
          const data = i.split(',', 1)[0];
          const buffer = Buffer.from(data, 'base64');
          const canvas = createCanvas(1024, 1024); 
          const ctx = canvas.getContext('2d');
          const img = await loadImage(buffer);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          fs.writeFileSync('image.jpg', canvas.toBuffer('image/jpeg'));
      }
  };

  // Write data to request body
  req.write(postData);
  req.end();

}

module.exports = artMaker;