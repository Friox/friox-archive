---
slug: msa-spring-1
title: Spring Cloud, MSA를 위한 핵심기술
description: Spring Cloud와 MSA 환경에서 사용하는 기술을 학습하고 정리했습니다. Spring Discovery Client, RestTemplate, 인증방식, Config Server 등 주요 개념과 간단한 구현 방법을 다룹니다.
createAt: 2025-04-01
category: 개발
tags: [DevOps, SpringCloud, DiscoveryClient, ConfigServer, Deepdive]
series: deepdive - MSA
---

> **kakao x goorm deepdive 백엔드 3회차**  
> 이 게시물은 해당 과정 참여 중 별도로 학습한 내용을 정리한 것입니다.

## Spring Dicovery Client
로드밸런서와 그 안에 등록된 서비스에 대해 가장 낮은 수준으로 접근할 수 있음.  
스프링 클라우드 로드밸런서 클라이언트에 등록된 모든 서비스와 해당 URL을 쿼리할 수 있다.

## RestTemplate
- Spring Framework에서 제공하는 HTTP Client 라이브러리
- HTTP Method를 쉽게 사용할 수 있게 도와주는 메서드를 제공한다
- 동적 URL을 쉽게 구성할 수 있다.
- 요청, 응답에 대한 객체 변환을 자동으로 처리하며, 헤더관리 등 다양한 기능 제공

### 단점
Discovery Client를 직접 호출하면 서비스 리스트를 얻을 수 있지만,  
호출할 서비스 인스턴스를 선정할 책임은 사용자에게 있다.  
⇒ 로드밸런서를 이용하지 못함.

또한 코드에서 서비스를 호출하는 데 사용할 URL을 직접 생성해야한다.

### `@LoadBalanced`
```java
@LoadBalanced
@Bean
public RestTemplate getRestTemplate() {
	return new RestTemplate();
}
```

```java
@Component
public class OrganizationRestTemplateClient {
	@Autowired
	RestTemplate restTemplate;
	public Order getOrder(String orderId) {
		ResponseEntity<Order> restExchange =
			restTemplate.exchange(
				"http://order-service/v1/order/{orderId}",
				HttpMethod.GET, null,
				Organization.class, orderId);
		return restExchange.getBody();
	}
}
```

- Spring Cloud Discovery Client를 직접 사용하지 않는다.
- `restTemplate.exchange()` 호출에 사용된 URL에서 서버 이름은  
    Eureka에 등록할 때 사용된 서비스키의 애플리케이션 ID와 일치한다.

## 인증 시점

### API Gateway JWT
- Spring Cloud Gateway에서 JWT 토큰을 검증하는 방식
- 유효한 경우 `Authenication` 객체를 생성하고 각 서비스로 전달
- 검증된 사용자 정보를 각 서비스에 전파할 수 있음

> **장점**
> - 중앙화된 인증 처리 : 모든 서비스가 Gateway에서 인증되므로 서비스단에서 검증할 필요 없음
> - 보안성 향상 : 인증 처리가 중앙에서 이루어지기 때문에 보안 관련 로직이 통합적으로 관리 됨
> - 재사용성 : 동일한 JWT 검증 로직을 중복해서 작성할 필요가 없다

> **단점**
> - 단일 장애 지점(SPOF) : Gateway가 죽으면 모든 요청을 처리할 수 없게 된다
> - 성능 문제 : 인증 로직이 Gateway에 집중되면 과부하가 걸릴 가능성이 있다
> - 복잡성 증가 : 사용자 정보를 각 마이크로서비스로 전달하는 방식을 잘 설계해야 함  
>   각 서비스는 미리 검증된 `Authenication` 객체에만 의존하게 해야한다.

### 각 서비스에서 JWT 토큰 검증
- 모든 마이크로서비스에서 JWT 검증 로직을 직접 구현한다.
- 각 서비스는 요청 시 헤더에 있는 JWT를 파싱하여 인증을 수행한다.

> **장점**
> - 독립성 : API Gateway가 필요없거나 가벼운 역할만 하기때문에 독립적으로 운영 가능
> - 확장성 : 서비스마다 독립적으로 확장될 수 있으므로, Gateway의 과부하를 피할 수 있다
> - 유연성 : 각 서비스는 인증 로직에 필요한 변경 사항을 빠르게 반영할 수 있다

> **단점**
> - 코드 중복 : 모든 서비스에서 JWT 검증 로직을 구현해야해서 코드 중복이 발생할 수 있음
> - 유지 보수 : JWT 검증 로직에 변경이 생기면 각 서비스에서 해당 로직을 업데이트 해야 함
> - 성능 저하 : 각 서비스가 동일한 작업을 반복적으로 수행하게 되어 성능 저하 발생

### OAuth2.0 토큰 검증
> **OAuth2.0**
> - 인증과 권한 부여를 위한 표준 프로토콜
> - 사용자가 다른 서비스에 자신의 자원에 접근할 수 있도록 허용하는 안전한 방법을 제공
> - 사용자는 자신의 비밀번호를 공유하지 않고도 3rd party app이 자원에 접근할 수 있도록 함

- OAuth2 인증 서버를 구현하여 각 마이크로서비스가 JWT의 유효성을 확인하는 방식
- 각 서비스는 JWT를 직접 검증하지 않고, OAuth2 인증 서버에 유효성 검증을 요청 함
- 각 서비스는 응답을 바탕으로 인증 처리를 수행한다
- 보통 직접 구현한다기보다 Google, Kakao 등의 인증 서버를 활용하는 방법이 가장 간편하다

> **장점**
> - 토큰 관리의 유연성 : JWT뿐만아니라 다른 인증방식의 토큰도 검증할 수 있다
> - 중앙화된 검증 : 모든 검증로직이 OAuth2 인증 서버에서 이루어진다
> - 보안성 : 토큰상태(유효성, 만료)를 중앙에서 관리한다

> **단점**
> - 추가적인 네트워크 요청 : 중앙 인증서버를 거치기때문에 지연시간이 생긴다
> - 복잡성 증가 : OAuth2 서버를 추가적으로 구성하고 검증 로직을 별도로 구현해야 함
> - 고가용성 필요 : 인증 서버가 중단되면 서비스가 인증을 처리하지 못한다

### 그래서 뭘 사용할까?
- API Gateway 방식은 관리 및 유지보수가 중요할때
- 서비스 검증은 서비스 간 독립성을 보장해야할때
- OAuth2 인증방식은 서드파티 애플리케이션 연동이 필요할때

## Config Server
- 분산 시스템에서 설정 정보를 중앙에서 관리할 수 있도록 지원하는 서버
- 여러 서비스의 설정 파일을 외부 저장소에 분리하여 관리한다
- 설정 변경 시 서비스의 재배포 없이 변경 사항을 반영할 수 있다
- MSA 환경에서는 배포되는 실제 코드와 구성정보를 완전히 분리해야한다
- 여러 환경에서도 절대 변경 되지 않는 불변 애플리케이션 이미지를 빌드한다
- 서버가 시작될때 서비스가 읽어오는 환경변수 또는 중앙저장소를 통해 구성정보를 주입한다

> **장점**
> - 유지보수 간소화 : 여러 서비스의 설정 정보를 중앙에서 관리한다
> - 중복 설정 제거 : 중복 설정을 제거하여 일관된 업데이트 적용이 가능하다
> - 무중단 : 재배포 없이 설정 변경이 가능하여 운영 효율성이 높다

> **단점**
> - Config Server에 장에가 발생하면 모든 서비스에 영향을 주는 단일 장애 지점이 될 수 있다
> - 민감한 정보 보호를 위한 추가적인 보안 조치가 필요하다

### 구현 방법

1. 의존성 추가
```groovy
implementation 'org.springframework.cloud:spring-cloud-config-server'
```

2. 메인 클래스에 어노테이션 추가
```groovy
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(ConfigServerApplication.class, args);
	}
}
```

3. 설정 파일 작성 (`application.yml`)
```yaml
server:
  port: 8888

spring:
  application:
    name: config-service
  cloud:
    config:
      server:
        git:
          uri: https://github.com/your-repository
          search-paths: /config-files
          default-label: main
```

4. [인스턴스 측 설정] 의존성 추가
```groovy
implementation 'org.springframework.cloud:spring-cloud-starter-config'
implementation 'org.springframework.cloud:spring-cloud-starter-bootstrap'
```

5. `bootstrap.yml` 작성 (`application.yml` 보다 먼저 로드됨)
```yaml
# bootstrap.yml
spring:
	cloud:
		config:
			uri: [스프링 클라우드 컨피그 서버 주소]
			name: [읽어올 파일]
			
# application.yml
spring:
	config:
		import:
			- classpath:/bootstrap.yml
```

## Spring Actuator
- Spring Boot 애플리케이션의 운영 환경에서 모니터링 및 관리를 위한 기능을 제공
- 애플리케이션 상태, 메트릭, 환경설정 등의 정보를 실시간으로 확인할 수 있다
- 애플리케이션의 로깅 레벨 변경, 설정 갱신, 애플리케이션 재시작 등 관리 작업을 수행할 수 있다
- 필요에 따라 사용자 정의 엔드포인트를 추가하여 기능을 확장할 수 있다

### 설정 방법

1. 의존성 추가
```groovy
implementation 'org.springframework.boot:spring-boot-starter-actuator'
```

2. 설정
```yaml
### 기본 경로 수정
management:
	endpoints:
		web:
			base-path: /management
			
### 엔드포인트의 노출 여부 제어
management:
	endpoints:
		web:
			exposure:
				include: health,info,beans,conditions
				exclude: threaddump, heapdump
```

### 엔드포인트
- 기능에 따라 의존성이나 Bean 등록이 필요할 수 있다.
| **엔드포인트** | **설명** |
| --- | --- |
| **`/actuator/health`** | 애플리케이션의 상태 정보 제공 |
| **`/actuator/metrics`** | CPU, 메모리 사용량 등 메트릭 정보 제공 |
| **`/actuator/env`** | 환경 변수 및 설정 값 조회 |
| **`/actuator/beans`** | 애플리케이션에 등록된 Spring Bean 목록 조회 |
| **`/actuator/loggers`** | 로깅 레벨 확인 및 변경 |
| **`/actuator/httptrace`** | 최근 HTTP 요청/응답 기록 조회 (추가 설정 필요) |
| **`/actuator/refresh`** | 설정 정보 갱신 (Spring Cloud Config와 함께 사용 시 유용) |