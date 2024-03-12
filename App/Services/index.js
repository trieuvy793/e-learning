import { request, gql } from 'graphql-request'

const MASTER_URL = "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cltbfhnca2u1007ussctdestv/master";

export const getCourseList = async(level)=> {
  const query = gql`
  query CourseList {
    courses(where: {level: `+level+`}) {
      id
      name
      price
      level
      tags
      time
      author
      description {
        markdown
      }
      banner {
        url
      }
      chapters {
        content {
          heading
          description {
            markdown
            html
          }
          output {
            markdown
            html
          }
        }
        title
        id
      }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const enrollCourse=async(courseId,userEmail)=>{
  const mutationQuery=gql`
  mutation MyMutation {
    createUserEnrolledCourse(
      data: {courseId: "`+courseId+`", userEmail: "`+userEmail+`", course: {connect: {id: "`+courseId+`"}}}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const getUserEnrolledCourse=async(courseId,userEmail)=>{
  const query=gql`
  query GetUserEnrolledCourse {
    userEnrolledCourses(where: {courseId: "`+courseId+`", 
      userEmail: "`+userEmail+`"}) {
      id
      courseId
      completedChapter {
        chapterId
      }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const markChapterCompleted=async(chapterId,recordId)=>{
  const mutationQuery=gql
  `
  mutation markChapterCompleted {
    updateUserEnrolledCourse(
      data: {completedChapter: {create: {data: {chapterId: "`+chapterId+`"}}}}
      where: {id: "`+recordId+`"}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection {
      edges {
        node {
          id
        }
      }
    }
  }  
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}