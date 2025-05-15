import React from 'react'
import { Badge, Box, ColorPalette, Container, Heading, SimpleGrid, Stack, SystemStyleObject, Text, Timeline, Card, Icon } from '@chakra-ui/react'
import { LuCheck, LuBuilding, LuUser } from 'react-icons/lu'
import { TbCertificate } from "react-icons/tb";
import { PiGraduationCap } from "react-icons/pi";

const aboutWrapperStyle: SystemStyleObject = {
  "&": {
    fontSize: 'sm',
    lineHeight: 1.9,
    wordBreak: 'keep-all',
    md: {
      fontSize: 'initial'
    }
  },
  "& h1, h2, h3": {
    fontWeight: '600',
    lineHeight: 1.4,
    marginBottom: '8px',
    width: 'fit-content',
    paddingBottom: '4px',
    borderBottom: '1px solid',
    borderColor: 'border.emphasized',
    scrollMarginTop: '110px',
    md: {
      lineHeight: 1.2
    }
  },
  "& h1": {
    fontSize: '2xl',
    marginTop: '50px',
    marginBottom: '25px',
    md: {
      fontSize: '3xl',
    }
  },
  "& h2": {
    fontSize: 'xl',
    marginTop: '40px',
    marginBottom: '20px',
    md: {
      fontSize: '2xl',
    }
  },
  "& h3": {
    fontSize: 'lg',
    marginTop: '30px',
    marginBottom: '15px',
    md: {
      fontSize: 'xl',
    }
  },
  "& ol, ul": {
    marginLeft: '24px',
  },
  "& ol": {
    listStyleType: 'decimal'
  },
  "& ul": {
    listStyleType: 'disc'
  },
}

type Props = {
  key?: number,
  title?: string,
  icon?: React.ReactNode,
  badgeValue?: string,
  badgeColor?: ColorPalette,
  badgeWrap?: boolean,
  dateStart?: string,
  dateEnd?: string,
  description?: string
}
const TimelineFactory: React.FC<Props> = (
  props, key
) => {
  const {
    title,
    icon = <LuCheck />,
    badgeValue,
    badgeColor = 'green',
    badgeWrap = false,
    dateStart,
    dateEnd,
    description
  } = props
  return (
    <Timeline.Item key={key}>
      <Timeline.Connector>
        <Timeline.Separator />
        <Timeline.Indicator>
          {icon}
        </Timeline.Indicator>
      </Timeline.Connector>
      <Timeline.Content>
        {badgeWrap && badgeValue && <Badge width='fit-content' colorPalette={badgeColor}>{badgeValue}</Badge>}
        <Timeline.Title>{!badgeWrap && badgeValue && <Badge colorPalette={badgeColor}>{badgeValue}</Badge>}{title}</Timeline.Title>
        {(dateStart || dateEnd) && <Timeline.Description>{dateStart}{dateEnd && `~ ${dateEnd}`}</Timeline.Description>}
        {description && <Text textStyle="sm">{description}</Text>}
      </Timeline.Content>
    </Timeline.Item>
  )
}

type AwardItem = {
  key?: number,
  title: string,
  date: string,
  grade: string,
  color: ColorPalette,
  count: number,
  inout: number,
  org: string
}

const AwardFactory: React.FC<AwardItem> = (
  props, key
) => {
  const {
    title, date, grade, color, count, inout, org
  } = props
  return (
    <Card.Root>
      <Card.Body>
        <Stack>
          <Stack direction='row'>
            <Badge colorPalette={color} width='fit-content'>{grade}</Badge>
            <Badge colorPalette={!inout ? 'blue' : 'green'} width='fit-content'>{!inout ? '교내' : '교외'}</Badge>
          </Stack>
          <Stack gap='0px'>
            <Text fontSize='sm' fontWeight='semibold'>{title}</Text>
            <Text fontSize='xs' color='fg.muted'>{date}</Text>
          </Stack>
          <Stack gap='3'>
            <Stack direction='row' alignItems='center'>
              <Icon size={{ base: 'xs', md: 'md' }}><LuUser/></Icon>
              <Text fontSize={{ base: 'xs', md: 'sm' }} lineHeight='1'>{count == 1 ? '개인' : `단체 (${count}명)`}</Text>
            </Stack>
            <Stack direction='row' alignItems='center'>
              <Icon size={{ base: 'xs', md: 'md' }}><LuBuilding/></Icon>
              <Text fontSize={{ base: 'xs', md: 'sm' }} lineHeight='1'>{org}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

const AboutCustom = () => {

  const eduHistory: Props[] = [
    { title: '동의대학교', icon: <PiGraduationCap />, badgeValue: '졸업', badgeColor: 'red', dateStart: '2019. 03. 21.', dateEnd: '2025. 02. 21.', description: '응용소프트웨어공학전공' },
    { title: 'NAVER CONNECT 부스트캠프 웹·모바일 9기 챌린지', badgeValue: '부트캠프', badgeWrap: true, dateStart: '2024. 07. 15.', dateEnd: '2024. 08. 09.' },
    { title: 'kakao X goorm DEEPDIVE 백엔드 개발자 과정 3회차', badgeValue: '부트캠프', badgeWrap: true, dateStart: '2025. 02. 25.', dateEnd: '2025. 09. 15.' }
  ]

  const awardHistory: AwardItem[] = [
    { title: 'IoT응용시스템WG 컴퓨터 프로그래밍 경진대회', grade: '장려상', color: 'teal', inout: 0, date: '2022. 12. 02.', count: 1, org: '동의대학교 LINC 3.0 사업단장' },
    { title: '2023년 동남권 SW품질캠프', grade: '최우수상', color: 'yellow', inout: 1, date: '2023. 07. 18.', count: 2, org: '부산정보산업진흥원장' },
    { title: 'SUMMER HACK 경진대회', grade: '대상', color: 'yellow', inout: 0, date: '2023. 08. 19.', count: 4, org: '동의대학교 LINC 3.0 사업단장' },
    { title: '2023 SW 테스트 경진대회', grade: '기업 특별상', color: 'purple', inout: 1, date: '2023. 08. 25.', count: 2, org: '주식회사 마유비' },
    { title: '2023 컴퓨터 프로그래밍 경진대회', grade: '최우수상', color: 'yellow', inout: 0, date: '2023. 12. 08.', count: 3, org: '동의대학교 LINC 3.0 사업단장' }
  ]

  const etcHistory: Props[] = [
    { title: 'PCCP Lv. 2', icon: <TbCertificate />, badgeValue: '자격증', dateStart: '2023. 09. 24.' },
    { title: '정보처리기사 (필기 및 실기)', icon: <TbCertificate />, badgeValue: '자격증', dateStart: '2024. 12. 11.' },
  ]

  return (
    <Container maxW='3xl'>
      <Stack css={aboutWrapperStyle}>
          <Stack>
            <Heading as='h1'>안녕하세요! 👋</Heading>
            <Box>
              <Text>저는 <strong>이승훈(Friox)</strong> 입니다.</Text>
              <Text>모바일 애플리케이션 개발자를 꿈꾸고 있어요.</Text>
              <Text>서버같이 눈으로 보이지 않는 분야에도 관심이 매우 많습니다.</Text>
            </Box>
          </Stack>
          <Stack pb='24px'>
            <Heading as='h2'>🧑‍💻 제 소개를 간단히 하자면...</Heading>
            <ul>
              <li><strong>전공</strong> : 응용소프트웨어공학과를 졸업했어요.</li>
              <li><strong>기술 스택</strong></li>
              <ul>
                <li>
                  <strong>Language</strong>
                  <Stack wrap='wrap' direction='row' marginBottom='12px'>
                    <Badge colorPalette='blue'>C++</Badge>
                    <Badge colorPalette='red'>Swift</Badge>
                    <Badge colorPalette='orange'>Java</Badge>
                    <Badge colorPalette='yellow'>JavaScript</Badge>
                    <Badge colorPalette='blue'>Dart</Badge>
                  </Stack>
                </li>
                <li>
                  <strong>Framework</strong>
                  <Stack wrap='wrap' direction='row' marginBottom='12px'>
                    <Badge colorPalette='green'>Spring Boot</Badge>
                    <Badge colorPalette='blue'>React</Badge>
                    <Badge colorPalette='blue'>Flutter</Badge>
                  </Stack>
                </li>
                <li>
                  <strong>Tool</strong>
                  <Stack wrap='wrap' direction='row'>
                    <Badge colorPalette='orange'>IntelliJ IDEA</Badge>
                    <Badge colorPalette='green'>Android Studio</Badge>
                    <Badge colorPalette='blue'>VSCode</Badge>
                  </Stack>
                </li>
              </ul>
            </ul>
          </Stack>
          <Stack>
            <Heading as='h2'>학력, 교육 이력</Heading>
            <Timeline.Root>
              {eduHistory.map((item, idx) => TimelineFactory(item, idx))}
            </Timeline.Root>
          </Stack>
          <Stack pb='24px'>
            <Heading as='h2'>수상 내역</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap='32px'>
              {awardHistory.map((item, idx) => AwardFactory(item, idx))}
            </SimpleGrid>
          </Stack>
          <Stack>
            <Heading as='h2'>자격 취득 내역</Heading>
            <Timeline.Root>
              {etcHistory.map((item, idx) => TimelineFactory(item, idx))}
            </Timeline.Root>
          </Stack>
      </Stack>
    </Container>
  )
}

export default AboutCustom