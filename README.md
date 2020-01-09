Toot API integration
====================================

 - Styling. [Bulma][bulma]
 - Toot. [Masto.js][masto]
 - App. [React][react]
 - Tooling. [Create React App][cra]



### Create-react-app

First is `npx` and second is `npm`

```
npx create-react-app my-app
npm install react-router-dom --save
```

### Toot

 - The library used here is [Masto.js][masto]
 - This is a [list of libs][m1]


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



### Deploy

For deploying the build from different place [have a look at this][d1].

TLDR; `package.json` add the following line.

```
"homepage": ".",
``` 














[bulma]: https://bulma.io/documentation/modifiers/color-helpers/
[m1]: https://docs.joinmastodon.org/client/libraries/
[masto]: https://github.com/neet/masto.js
[d1]: https://create-react-app.dev/docs/deployment#serving-the-same-build-from-different-paths
[react]: https://reactjs.org/
[cra]: https://create-react-app.dev/



