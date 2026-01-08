plugins {
    id("org.danilopianini.gradle-pre-commit-git-hooks") version "2.1.6"
}

gitHooks {
    commitMsg { conventionalCommits() } // Applies the default conventional commits configuration
    createHooks()
}
