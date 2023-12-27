const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part,idx)=><Part key={idx} part={part}/>)}   
  </>

const Course = ({course}) => {
  const sum = course.parts.reduce((accumulator, curr)=>{
    return accumulator+curr.exercises;
  }, 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  )
}

export default Course;