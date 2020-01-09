React App for Toot Updates
====================================

First is `npx` and second is `npm`

```
npx create-react-app my-app
npm install react-router-dom --save
```

### Toot
The library used here is [Masto.js][masto]



### app.config.js

This file is located inside `comps/` folder. The file contents look as below.

```
// visibility : public, unlisted, private, direct

const AppConfig = {
    'mastodon':{
        'uri' : 'mastodon instance url',
        'accessToken' : 'your access token for developer',
        'statusVisibility' : 'direct',
    }
}

export default AppConfig;
```












[masto]: https://github.com/neet/masto.js





