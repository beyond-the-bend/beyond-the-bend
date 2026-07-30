const fs = require('fs');
const file = 'C:/BTB/Content/newsletters/NEWSLETTER_IMAGINING_SOMETHING_BIGGER.html';
let content = fs.readFileSync(file, 'utf8');

const targetSection = `<div class="practice-section">
                <h2>Practice of the Week</h2>

                <h3>Becoming Curious</h3>

                <p>As you move through the coming week, you might gently notice where you have been keeping yourself small. This is not an invitation to criticize yourself or to pressure yourself into change. It is simply an opportunity to become curious.</p>

                <p>Is there a desire you have been afraid to acknowledge?</p>

                <p>A part of yourself you have kept hidden?</p>

                <p>A possibility that feels both exciting and frightening?</p>

                <p>You do not have to make a giant leap. You may simply be ready to give that part of yourself a little more space.</p>
            </div>`;

const newSection = `<div class="practice-section">
                <h2>Practice of the Week</h2>

                <h3>Imagining Something Bigger (Audio Practice)</h3>

                <p>This week, rather than giving you something to read, I have recorded a special 15-minute guided audio practice. I invite you to put your headphones in, take this meditation out for a walk, and allow yourself to gently explore the spaces where you might be keeping yourself small.</p>
                
                <p>You do not have to make a giant leap to change your life. You may simply be ready to give that part of yourself a little more space to breathe.</p>

                <div style="text-align: center; margin: 30px 0 20px;">
                    <img src="https://btb-assets.b-cdn.net/assets/imagine_bigger_thumb.png" alt="Imagine Something Bigger" style="width: 100%; max-width: 300px; border-radius: 12px; box-shadow: 0 8px 24px rgba(47, 51, 45, 0.15); margin-bottom: 20px;">
                    <br>
                    <a href="https://btb-sanctuary.vercel.app" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 28px; text-decoration: none; border-radius: 50px; font-size: 15px; letter-spacing: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-weight: bold; background-color: #b98178; color: #F7F4EF !important;">Listen to the Meditation</a>
                </div>
            </div>
        </div>

        <div class="content-block">
            <div class="embodied-card">
                <span style="display: inline-block; background-color: #556b2f; color: #F7F4EF; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 12px; border-radius: 99px; margin-bottom: 15px;">Now Open</span>
                <h3 style="margin-top: 0; color: #556b2f; font-style: normal; font-weight: 600; font-size: 24px; margin-bottom: 15px;">Step Inside The Sanctuary</h3>
                
                <p style="font-size: 18px; font-style: italic; color: #4a4a4a; line-height: 1.7; margin-bottom: 20px;"><strong>A digital home for your practice.</strong></p> 
                
                <p>The audio practice above is just one of the many guided meditations, breath practices, and full-length classes waiting for you inside The Sanctuary. This space is designed to be a soft landing pad where you can show up exactly as you are, at whatever time of day you need it most.</p>
                
                <p>Right now, it contains our complete library of weekly livestream class recordings, giving you over fifty on demand practices to choose from, ranging from slow somatic hatha to deep restorative sequences.</p> 
                
                <p>I am opening the doors with a special founding member rate of $22 CAD per month. If you join now, this introductory price is locked in for the lifetime of your subscription. As the library fills with more resources, the price will increase for new members, but your rate will remain exactly the same.</p>
                
                <p style="margin-bottom: 0;">If you would like to explore the space, see what is inside, and join us as a founding member, you can click the button below.</p>
                
                <div style="text-align: center; margin: 30px 0 10px;">
                    <a href="https://btb-sanctuary.vercel.app/login.html" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-size: 15px; letter-spacing: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-weight: bold; background-color: #3F4A3C; color: #F7F4EF !important;">Step Inside the Sanctuary</a>
                </div>
            </div>`;

content = content.replace(targetSection, newSection);

fs.writeFileSync(file, content, 'utf8');
console.log('Newsletter updated successfully!');
