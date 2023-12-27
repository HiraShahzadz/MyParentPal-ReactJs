import {
    StarIcon,
    PresentationChartLineIcon,
    RocketLaunchIcon,
  } from "@heroicons/react/24/solid";
  import "@/child/styles/ChildHome.css"; // Reference your CSS file here
  import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';

  
  export const tasksData = [
    {
      id: 1,
      title: "Clean Bedroom",
      description: new Date("2023-12-12"),
       reward: "Pencil Box",
       time:"10:00 pm",
       details:"Clean your bedroom, put every things in its place and attach a picture of room when you submit this task.You have to complete this task!",
     
    },
    {
      id: 2,
      title: "Mopping",
      description: new Date("2023-12-26"),
       reward: "Paint colors",
       time:"8:00 pm",
       details:"Clean your bedroom, put every things in its place and attach a picture of room when you submit this task.You have to complete this task!",
     
    },
    {
      id: 3,
      title: "Learn Lesson",
      description: new Date("2023-12-26"),
      reward: "Toys",
       time:"11:00 pm",
       details:"Clean your bedroom, put every things in its place and attach a picture of room when you submit this task.You have to complete this task!",
      
    },
    {
      id: 4,
      title: "Wash dishes",
      description: new Date("2023-12-24"),
      reward:"Snacks",
       time:"11:00 pm",
       details:"Clean your bedroom, put every things in its place and attach a picture of room when you submit this task.You have to complete this task!",
      
    },
    {
      id: 5,
      title: "Make bed",
      description: new Date("2023-12-13"),
      reward: "Geometry Box",
       time:"9:00 pm",
       details:"Clean your bedroom, put every things in its place and attach a picture of room when you submit this task.You have to complete this task!",
      
    },
    {
      id: 6,
      title: "Clean Bedroom",
      description: new Date("2023-12-15"),
      reward: "Book",
       time:"12pm",
       details:"Clean your bedroom, put every things in its place and attach a picture of room when you submit this task.You have to complete this task!",
     
    },
  ];
  
  export default tasksData;
  