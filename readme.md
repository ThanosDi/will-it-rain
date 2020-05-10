# Will it rain

A node app to use with your Raspberry pi or any other server to notify you via email if it will rain in your city in the next 3 hours.

## How to use:

### Step 1

- Create an api key from https://openweathermap.org/appid and replace
  `OPEN_WEATHER_API_KEY` in the `env-vars.js` file.

### Step 2

- Create or use your smtp credentials from a gmail account(pref. create a new one) and replace
  `GMAIL_USERNAME` and `GMAIL_PASSWORD` in the `env-vars.js` file.
- Go to https://myaccount.google.com/lesssecureapps with that google account and enable `Allow less secure apps`.

### Step 3

- Find the city id from the `city.list.json` file.

- Replace `CITY_ID` in the `env-vars.js` file.

### Step 4

- Find out the node path of your system by running `which node` in a terminal.
- Open crontab by running `crontab -e`
- Add a new cron job pointing to this node app.
  Example to check every hour from 8am to 11pm:

  ```
  0 8-23 * * * cd /path/to/node/app/will-it-rain/src && /snap/bin/node index.js`
  ```

### Step 5 (optional)

- `NOTIFY_AGAIN_AFTER` in the `env-vars.js` file is set by default to re notify you in 12 hours.
  Change it to your will.
