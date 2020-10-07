# mongodb
- NoSQL(NotOnly SQL) 중에서 문서형태로 데이터를 저장하는 Document DB 

## 특징
 - 기존 RDBMS에 비해 파격적이다.
 - schema 기능을 지원하나 추가기능이고 acid 원칙도 지켜지지 않는다.
 - CAP(Consistency, Availability, Partition available) 3가지 원칙(이것도 낡았다.) 을 추구한다.
 - Read/Write가 뛰어나고 대량의 네트워크 트래픽등에도 RDBMS 보다 유리하다.
 - JSON(Binary json - Bson) 형태로 저장
## 용어(RDB 용어 : mongodb 용어)
1. database : database
2. table : collection
3. Tuple/Row : Document
4. Column : field
5. Table Join : Embedded Document

## 기본적인 DB 관리 명령어
1. show dbs : mongodb 내에 있는 데이터베이스의 목록 확인
2. use db_name : db 사용/ db 생성 명령어 따로 없고 이걸로 없으면 생성
3. show collections : 현재 db내의 collection 확인
4. db.dropDatabase() : 현재 데이터 베이스 삭제
5. collection 도 생성문구 없고 아무 이름적어서 없으면 생성한다.
6. db.stats() : 데이터베이스의 정보 상세
7. db.collection_name.stats(); : collection 정보 상세
- 위의 명령어를 보면 알 수 있듯이 javascript engine 과 비슷하게 보이는데 javascript engine 맞다.

- 여기까지 숙지하고 이제 설치 해보자

# MongoDB 설치
## 환경
-  linux (centos 6 기준)
1. 패키지 관리자가 mongoDB 설치 파일을 찾기위한 repository 등록
- 내용(여기서 버전은 받을 버전으로)
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

2. yum repolist
- 여기서 에러나면 repository 설정 잘못한거니까 공식홈페이지가서 확인
3. yum install mongodb-org
4. service mongod status
- 상태 확인
5. service mongod start
- 구동
6. chkconfig mongod on 
- 리눅스 구동시 자동으로 켜지도록 runlevel 조정
7. chkconfig --list 
- runlevel list에 mongod 가 level3이 켜져있는지 확인한다.
8. vi /var/log/mongodb/mongod.log
- mongodb 관련 실행 로그를 확인한다.
9. vi /etc/sysconfig/iptables 
- 여기서 포트를 열어놓는다. 열어놓는 방법은 accept 라고 적힌 줄 복사해서
붙여넣고 27017(mongodb 기본 port)로 port번호만 바꾼다.
- /etc/init.d/iptables restart
10. vi /etc/init.d/mongod.conf 
- 여기에 보면 network interface 에 bindIP 가 있는데 이부분을 설정해줘야 접속이 가능하다.
- 누구나 접속 가능하게 하려면 0.0.0.0 으로 setting하면 된다.
11. mongod
- 실제 제대로 구동하는지 접속 테스트 이다. 여기서 안되면 리눅스 셋팅이 잘못되었던지 설정 부분에서 실수한거니 잘 점검해보자

- 이제부터는 node.js로 연결해서 다뤄보자.





