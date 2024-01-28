const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { LINKS } = require("./src/constants")

const coursePageTemplate = path.resolve("./src/templates/course-page/index.tsx")

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    
    const filepathRegex = /^\/([\d\.]+)-([\w-]+)/

    const [, courseOrder, coursePath] = value.match(filepathRegex)
    
    const courseRelativePath = LINKS[coursePath]

    createNodeField({
      name: `slug`,
      node,
      value: courseRelativePath,
    })

    createNodeField({
      name: "orderId",
      node,
      value: courseOrder,
    })
  }
}
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allCourses: allMdx(
        sort: { fields: { orderId: ASC } }
      ) {
        nodes {
          id
          fields {
            slug
            orderId
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts and courses`,
      result.errors
    )
    return
  }

  const courses = result.data.allCourses.nodes

  if (courses.length > 0) {
    courses.forEach((course, index) => {
      const previousCourseId = index === 0 ? null : courses[index - 1].id
      const nextCourseId =
        index === courses.length - 1 ? null : courses[index + 1].id

      createPage({
        path: course.fields.slug,
        component: `${coursePageTemplate}?__contentFilePath=${course.internal.contentFilePath}`,
        context: {
          id: course.id,
          previousCourseId,
          nextCourseId,
        },
      })
    })
  }
}
