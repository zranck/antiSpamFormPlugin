# antiSpamFormPlugin
A small JS plugin to prevent common spam from being posted to forms

Uses a few different techniques to weed out spammers, and bots

### Counter
The amount of time spent on the page is timed. A human user isn't going to fill out an entire contact us form in a couple seconds.

### Country of Origin
Check the IP of the user, against top countries known for spam. 
Using https://www.spamhaus.org/statistics/countries/ and https://www.projecthoneypot.org/comment_spammer_top_countries.php?dt=30
Russia, China, Ukraine, India, Thailand
If the country is detected the form is replaced with a message asking to call if they need help.

### EMAIL
A spammer could possibly spoof their IP, so an additional check is made against their email.
if the TLD matches that of a typical spammer the form is replaced with a message asking to call if they need help.
These are currently .ua and .ru

### Phone Number Validation
I've noticed a lot of spam doesn't include a valid phone number.
So this is a standard check that verifies the number could be valid
User is presented a message asking to enter a real number

### Honeypot Field
I've added a form field that is hidden to the average user. 
A simple bot isn't going to know it's hidden, and will fill it out.
upon submission if this field has text it is not actually submitted
