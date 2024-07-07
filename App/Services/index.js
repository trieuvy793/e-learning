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
      exercises {
          question
          options {
            answer1
            answer2
            answer3
            answer4
          }
          answer
        }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const getAllCourseList = async(email)=> {
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
      exercises {
          question
          options {
            answer1
            answer2
            answer3
            answer4
          }
          answer
        }
    }
    userDetail(where: {email: "`+email+`"}) {
      userType
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
      upsert: {
        create: {email: "`+email+`", point: 0, profileImage: "`+profileImageURL+`", userName: "`+userName+`", userType: Basic}, 
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
      userType
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
        exercises {
          question
          options {
            answer1
            answer2
            answer3
            answer4
          }
          answer
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

export const GetProjects = async () => {
  const query = gql`
  query GetProject {
    projects(first: 100) {
      name
      description
      projectSlug
    }
  }  
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export const deleteProject = async (projectSlug) => {
  const unpublishMutation = gql`
    mutation UnpublishProject {
      unpublishProject(where: { projectSlug: "`+projectSlug+`" }, from: PUBLISHED) {
        id
        name
        projectSlug
      }
    }
  `;

  const deleteMutation = gql`
    mutation DeleteProject {
      deleteProject(where: { projectSlug: "`+projectSlug+`" }) {
        id
        name
        projectSlug
        description
      }
    }
  `;

  await request(MASTER_URL, unpublishMutation);

  const result = await request(MASTER_URL, deleteMutation);
  return result;
}

export const updateProjectName = async (projectName, projectSlug) => {
  const mutationQuery = gql`
  mutation UpdateProject {
    updateProject(data: {name: "`+projectName+`"}, where: {projectSlug: "`+projectSlug+`"}) {
      id
    }
    publishProject(where: {projectSlug: "`+projectSlug+`"}) {
      id
    }
  }
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const updateProjectCode = async (description, projectSlug) => {
  const mutationQuery = gql`
  mutation UpdateProject {
    updateProject(data: {description: "`+description+`"}, where: {projectSlug: "`+projectSlug+`"}) {
      id
    }
    publishProject(where: {projectSlug: "`+projectSlug+`"}) {
      id
    }
  }
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const Payment = async (email, date, transactionCode, userType) => {
  const mutationQuery = gql`
    mutation Payment {
      updateUserDetail(
        where: {email: "`+email+`"}
        data: {payment: {create: {data: {date: "`+date+`", transactionCode: "`+transactionCode+`"}}}, userType: `+userType+`}
      ) {
        id
      }
      publishUserDetail(where: {email: "`+email+`"}) {
        id
      }
    }
  `;

    const result = await request(MASTER_URL, mutationQuery);
    return result;
};

