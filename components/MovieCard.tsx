// MovieCard.tsx
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const { width } = Dimensions.get('window')
const CARD_MARGIN = 10
const NUM_COLUMNS = 3
const CARD_WIDTH = (width - (NUM_COLUMNS + 1) * CARD_MARGIN - 40) / NUM_COLUMNS


const MovieCard = ({ imdbID, Poster, Title,Released,imdbRating }: Movie) => {
  return (
    <Link href={`/movies/${imdbID}`} asChild>
      <TouchableOpacity
        style={{
          width: CARD_WIDTH,
          marginBottom: 16,
        }}
      >
        <Image
          source={{ uri: Poster }}
          style={{
            width: '100%',
            height: 180,
            borderRadius: 12,
          }}
          resizeMode="cover"
        />
        <Text
          style={{ color: 'white', fontWeight: 'bold', marginTop: 8 }}
          className='text-sm'
          numberOfLines={1}
        >
          {Title}
        </Text>

        <View className='flex-row items-center justify-start gap-x-1-'>

            <Image source={icons.star} className='size-4'/>
             <Text className='text-xs text-white font-bold uppercase'>{imdbRating}</Text>

        </View>

        <View className='flex-row justify-between items-center'>
          <Text className='text-xs text-light-300 font-medium mt-1'>
            {Released?.split(" ")[2]} 
          </Text>
        </View>


      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
