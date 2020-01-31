# Recipe Palette

## 🚀 Quick start

1.  **Install the following**

    - Node.js (which includes npm)
    - Gatsby CLI `npm i -g gatsby-cli`

1.  **Clone the site**

    ```shell
    git clone https://github.com/recipepalette/recipepalette.git
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd recipepalette
    npm install
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🧐 What's inside?

Some of the files and directories in the project.

    .
    ├── node_modules (installed dependencies from npm or yarn)
    ├── src (all the code for the site, including React components)
    ├── .gitignore (files not to check in to source control)
    ├── .prettierrc (config for autoformatting tool Prettier)
    ├── gatsby-config.js (plugins and Gatsby related configuration)
    └── package.json (list of dependencies and other metadata)

## 🌲 Developing on a new branch

Pull the most recent changes from `master`:

```
git checkout master
git pull
```

Create a new branch with a given name:

```
git checkout -b <name-of-branch>
```

Develop changes and add/commit/push them as usual:

```
git add .
git commit -m "added changes"
git push -u origin <name-of-branch>
```

Stay in sync with master from time to time by pulling in the changes from master by switching to master, pulling changes, switching back to your branch, and merging master:

```
git checkout master
git pull
git checkout <name-of-branch>
git merge master
```

When you are finished, you can create a pull request from the GitHub UI, or manually withe these steps:

Go to master:

```
git checkout master
git pull
```

Then merge your development branch into master:

```
git merge <name-of-branch>
```

You may need to fix merge conflicts if new updates to files were affected by your changes.

## 👹 Hasura Migrations

Important files related to hasura are the `config.yaml` file at the root of the site and the `migrations` folder. The `config.yaml` lists an endpoint to interact with when you run commands from the console. There are 3 Hasura apps deployed:

- https://recipe-palette-dev.herokuapp.com/
- https://recipe-palette-stg.herokuapp.com/
- https://recipe-palette.herokuapp.com/

Running

```

```

## 💫 Deploy

Gatsby Cloud automatically creates deploy previews of all PRs, which can then be autodeployed to Netlify for hosting when merged into master.
