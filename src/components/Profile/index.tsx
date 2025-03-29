import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Stack, Text, Icon, SystemStyleObject, Box } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { config } from '@/constants/config'

const descriptionStyle: SystemStyleObject = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

const Profile: React.FC = () => {
  return (
    <Stack direction='row' css={{ marginX: '8px', md: { marginX: '0' } }}>
      <Box>
        <StaticImage 
          src='./profile.png'
          alt='profileimage'
          layout='constrained'
          placeholder='blurred'
          quality={90}
          style={{
            borderRadius: 'var(--chakra-radii-full)',
            width: '100px',
            height: '100px'
          }}
        />
      </Box>
      <Stack gap='16px' justifyContent='center' marginLeft='6' minWidth='0'>
        <Stack gap='8px' lineHeight='1'>
          <Text fontWeight='bold' fontSize='xl'>{config.userName}</Text>
          <Text css={descriptionStyle} fontSize='sm'>{config.userDescription}</Text>
        </Stack>
        {config.githubLink != '' && (<Stack direction='row'>
          <a href={config.githubLink} target='_blank'><Icon as={FaGithub} boxSize='7' /></a>
        </Stack>)}
      </Stack>
    </Stack>
  )
}

export default Profile