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

These endpoints all correspond to an app on Heroku that is running an identical instance of the Hasura `graphql-engine`.

By keeping individual apps we can update the schema, or play with data in the database while updating GraphQL queries without breaking production.

In order to make changes to the database don't use the link at https://recipe-palette.herokuapp.com/console, this will lead to inconsistent versions of the schema. We can turn this off with an `HASURA_GRAPHQL_ENABLE_CONSOLE=false` environment variable. It's on so we can still use GraphiQL and easily view the schema. We can change it if need be.

To make changes to the schema run:

```
hasura console --admin-secret <admin-secret>
```

When it's running it will open up a Hasura console like the one on the Heroku app with a GUI. When you make changes there however, it will automatically create timestamped migration files in the `migrations` folder. These migrations tell the Postgres database how tables are altered with up and down files. Up for editing the database to the new format, down for rolling it back. It basically saves our database schema as snapshots in time like git does for code so we can rollback to any point we may need.

To apply the migrations to a deployed app run:

```
hasura migrate apply --endpoint http://another-graphql-instance.herokuapp.com
```

To check the status of migrations:

```
hasura migrate status
```

## 💫 Deploy

Gatsby Cloud automatically creates deploy previews of all PRs, which can then be autodeployed to Netlify for hosting when merged into master.
