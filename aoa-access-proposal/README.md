# AOA Access 2.0 — Web Proposal

A static website: plain HTML, CSS and JavaScript, with no build step and nothing to install.

```
aoa-access-proposal/
├── index.html      page structure and copy
├── styles.css      styling (navy #0E2A4F, blue #1F5FAE, Poppins)
├── app.js          section content and interactions
├── assets/         portal screenshots
└── .vscode/        recommends the Live Server extension
```

## 1. Open it in VS Code

1. Unzip `aoa-access-proposal.zip`.
2. In VS Code, choose **File → Open Folder…** and pick the `aoa-access-proposal` folder.
3. If VS Code asks whether to install the recommended **Live Server** extension, accept. Otherwise search for "Live Server" in the Extensions panel.
4. Right-click `index.html` and choose **Open with Live Server**. The proposal opens at `http://127.0.0.1:5500`, and it reloads each time you save a file.

## 2. Publish it for viewing (pick one)

### Option A: Netlify Drop (quickest, no account setup in VS Code)
1. Go to https://app.netlify.com/drop.
2. Drag the `aoa-access-proposal` folder onto the page.
3. You get a public link straight away, such as `https://something.netlify.app`. Sign in to keep it and rename it (Site settings → Change site name).

### Option B: GitHub Pages (from inside VS Code)
1. Open the folder in VS Code and open the **Source Control** panel (Ctrl/Cmd+Shift+G).
2. Click **Publish to GitHub**, sign in, and choose a **public** repository.
3. On github.com, open the repository and go to **Settings → Pages**. Under Source choose **Deploy from a branch**, then pick **main** and **/(root)**, and save.
4. After about a minute, the proposal is live at `https://<your-username>.github.io/<repo-name>/`.

### Option C: Vercel
1. Install the Vercel CLI (`npm i -g vercel`) and run `vercel` in the VS Code terminal from this folder.
2. Accept the defaults. There is no framework and no build command.

## Notes

- **Sign-in screen:** it appears on the first visit and is remembered in the browser. Add `?gate=0` to the link to skip it, for example `https://…/index.html?gate=0`.
- **Editing text:** most of the content (deliverables, email sends, pricing, team) is in `app.js` near the top. The headings and fixed copy are in `index.html`.
- **Internet access:** fonts (Google Fonts) and icons (Phosphor, via unpkg) load from the internet, so view the page online.
