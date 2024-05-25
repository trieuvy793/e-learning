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

export const getAllCourseList = async()=> {
  const query = gql`
  query AllCourseList {
    courses {
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

export const markChapterCompleted=async(chapterId,recordId,userEmail,points)=>{
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

    updateUserDetail(where: {email: "`+userEmail+`"}, data: {point: `+points+`}) {
      point
    }
    publishUserDetail(where: {email: "`+userEmail+`"}) {
      id
    }
  }  
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const isCompletedChapter=async(chapterId,recordId)=>{
  const mutationQuery=gql
  `query isCompletedChapter {
    userEnrolledCourse(where: {id: "`+recordId+`"}) {
      completedChapter(first: 1, where: {chapterId: "`+chapterId+`"}) {
        id
      }
    }
  }  
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const createNewUser=async(userName,email,profileImageURL)=>{
  const mutationQuery=gql`
  mutation CreateNewUser {
    upsertUserDetail(
      upsert: {create: 
        {email: "`+email+`", point: 0, profileImage: "`+profileImageURL+`", userName: "`+userName+`"}, 
        update: {email: "`+email+`", profileImage: "`+profileImageURL+`", userName: "`+userName+`"}}
      where: {email: "`+email+`"}
    ) {
      id
    }
    publishUserDetail(where: {email: "`+email+`"}) {
      id
    }
  }  
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const getUserDetail=async(email)=>{
  const query=gql`
  query getUserDetails {
    userDetail(where: {email: "`+email+`"}) {
      point
      profileImage
      userName
      email
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

export const GetAllUsers=async()=>{
  const query = gql`
  query GetAllUsers {
    userDetails(orderBy: point_DESC) {
      id
      profileImage
      userName
      point
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const GetAllProgressCourse=async(userEmail)=>{
  const query = gql`
  query GetAllUserEnrolledProgressCourse {
    userEnrolledCourses(where: {userEmail: "`+userEmail+`"}) {
      completedChapter {
        chapterId
      }
      course {
        banner {
          url
        }
        chapters {
          id
          title
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
        }
        description {
          markdown
        }
        id
        level
        name
        author
        price
        time
      }
    }
  }   
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const UpdateUserDetail=async(userEmail,profileImage,userName)=>{
  const mutationQuery = `
  mutation UpdateUserDetail {
    updateUserDetail(where: {email: "`+userEmail+`"}, data: {profileImage: "`+profileImage+`", userName: "`+userName+`"}) {
      id
      email
      profileImage
      userName
    }
    publishUserDetail(where: {email: "`+userEmail+`"}) {
      id
    }
  }
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const GetAllExcercises=async()=>{
  const query = gql`
  query GetAllExercises {
    exercises {
      questions {
        title
        id
        content {
          description {
            markdown
          }
          answerList {
            answer1
            answer2
            answer3
            answer4
          }
        }
      }
      id
      name
      level
    }
  }  
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const CreateNewProject = async (projectName, projectSlug, description) => {
  
  const mutationQuery = gql`
  mutation CreateProject {
    createProject(data: {name: "`+projectName+`", projectSlug: "`+projectSlug+`", description: "`+description+`"}) {
      name
      id
    }
    publishProject(where: {projectSlug: "`+projectSlug+`"}, to: PUBLISHED) {
      name
      id
    }
  }
  
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

// export const CreateNewProject = async (projectName, description) => {
//   const mutationQuery = gql`
//   mutation CreateProject($name: String!, $description: String!) {
//     createProject(data: {name: $name, content: {create: {description: $description}}}) {
//       name
//       id
//     }
//     publishProject(where: {name: $name}, to: PUBLISHED) {
//       name
//       id
//     }
//   }
//   `;

//   const variables = {
//     name: projectName,
//     description: description,
//   };

//   try {
//     const result = await request(MASTER_URL, mutationQuery, variables);
//     return result;
//   } catch (error) {
//     console.error('Error saving project:', error);
//     throw error;
//   }
// };

// export const UpsertProject = async(projectName,description,title) => {
//   const mutationQuery = gql`
//   mutation UpsertProjects {
//     upsertProject(
//       upsert: {create: {name: "`+projectName+`", content: {create: {description: "`+description+`", title: "`+title+`"}}}, update: {content: {update: {data: {description: "`+description+`", title: "`+title+`"}}}, name: "`+projectName+`"}}
//       where: {name: "`+projectName+`"}
//     ) {
//       id
//       name
//     }
//     publishProject(where: {name: "`+projectName+`"}) {
//       id
//       name
//     }
//   }
//   `

//   const result = await request(MASTER_URL, mutationQuery);
//   return result;
// }