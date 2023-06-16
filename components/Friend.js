import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Friend = () => {
    const [container,setContainer] = useState([])
    const fetchMe = ()=> {
        fetch(`https://shazam-core7.p.rapidapi.com/songs/get_details?id=293401556`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '936bd9fe5fmshd6b04f3a8e8560ap1fbed9jsne6c834ad6ecb',
            'X-RapidAPI-Host': 'shazam-core7.p.rapidapi.com'
          }
        })
          .then(response => {
            return response.json()
          })
          .then(data=>{
            console.log(data)
            setContainer(data.images)
            
          })
          .catch(error => { console.log(error) })
        }
        useEffect(()=>{
            fetchMe()
        },[])
        console.log(container)
  return (
    <div>
      <h1>Friend List</h1>
        {
            container.length>0 && container.map((items)=>{
                return(
                    <div>
                        <Card>
                            <CardBody>
                                <Stack divider={<StackDivider/>} spacing='4'>
                                        <Box className='flex flex-row'>
                                            <img className='w-10 h-10 rounded-full' src={items?.background}/>
                                            
                                        </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Friend