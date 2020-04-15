import {getTemplateList} from '../Dashboard'

const fakeData = [
    {
        _id: 5020102021,
        summary: "test template",
        description: "test description",
        starttime: "13:00",
        endtime: "14:00"
    },
    {
        _id: 5020102022,
        summary: "test template2",
        description: "test description2",
        starttime: "13:05",
        endtime: "14:05"
    }
]

export default getTemplateList = async ({googleId}) => {
    try {
        const response = await new Promise((resolve)=>{
            resolve(fakeData)
        })
        return response.data;
      } catch (error) {
        console.log(error);
      }
}
