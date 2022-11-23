import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Paper, TextInput, Button, Group, Text } from '@mantine/core'
import { useState } from 'react'

const apiKey: string = "a1b57a1859f58ff20842b0558c13829b"

interface apiWeatherData {
  id: number,
  description: string,
  main: string,
  icon: string
}

interface tempData {
  temp: number,
  feels_like: number,
  temp_max: number,
  temp_min: number
}

export default function Home() {

  const [city, setCity] = useState<string>('')
  const [weatherData, setWeatherData] = useState<apiWeatherData[]>([]);
  const [tempData, setTempData] = useState<tempData>()

  const getData = async () => {
    try {
      const serverRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`)
      const data = await serverRes.json()
      console.log(data)
      if (data?.cod === '400') throw data;
      setWeatherData(data.weather)
      setTempData(data.main)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>NextJS with TypeScript Weather App</title>
      </Head>
      <div className={styles.layout}>
        <div className={styles.paper}>
          <Paper withBorder p='lg' style={{ maxWidth: '500px' }}>
            <Group position='apart'>
              <Text size='xl' weight={600}>
                Get The Weather
              </Text>
            </Group>
            <Group position='apart' mb='xs'>
              <Text size='md' weight={300}>
                Enter a city, and get the weather below!
              </Text>
            </Group>
            <Group position='apart' mb='xs'>
              <TextInput placeholder='example: Kathmandu' onChange={(e) => setCity(e.target.value)} />
            </Group>
            <Group position='apart'>
              <Button variant='gradient' size='md' onClick={() => getData()}>
                Get Weather
              </Button>
            </Group>
            {weatherData &&
              weatherData.map((weather) => {
                return (
                  <div key={weather.id}>
                    <Group position='left'>
                      <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weathericon" width='50' height='50' />
                      <Text size='xl' weight={200}>
                        <br />
                        Conditions: {weather.main}
                      </Text>
                    </Group>
                    <Group position='left'>
                      <Text size='xl' weight={200}>
                        Descriptions: {weather.description}
                      </Text>
                    </Group>
                    <Group position='left'>
                      <Text size='lg' weight={500} >
                        Temp: {tempData?.temp} °C <br />
                        Max Temp: {tempData?.temp_max} °C <br />
                        Min Temp: {tempData?.temp_min} °C <br />
                        Feels Like: {tempData?.feels_like} °C
                      </Text>
                    </Group>
                  </div>
                )
              })
            }

          </Paper>
        </div>
      </div >
    </>
  )
}
