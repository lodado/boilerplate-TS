# boilerplate
js SPA vanilla

부스트캠프에서 과제를 하면서 spa, spa router를 레퍼런스 없이 직접 만들었는데 공부하면서 구현하다보니 약간 불필요한 내용이 많이 들어가서 아예 갈아엎고 레퍼런스 참고하여 새로 만들려고 판 레포지토리 입니다.

<br>

## 개선사항

기존 구현한 코드의 간단한 클래스 다이어그램입니다.

기존 코드는 부스트캠프 내의 프로젝트라 비공개라 공유가 불가능합니다.

1. 값이 바뀔때, 바뀐 부분을 렌더링하라고 알려주는 기능을 구현하기 위해 기존 자체구현한 pub-sub 패턴 클래스를 ```Object.defineProperty``` 기능으로 대체 

2. 비효율적인 코드 제거(render하는 클래스와 component 자체 값(template)가지는 클래스가 나뉘어져 있었는데 합체)

<br>

## 구현

SPA 렌더링

부분 렌더링

SPA router

<br> 

## 리엑트와 다른점

##### 1. setState 함수 안에서 상태변경을 하지 않습니다.

```Object.defineProperty```를 사용해서 값을 참조할때 자동으로 get, 값을 변경하면 자동으로 set 함수가 실행되고 그 컴포넌트가 사용하는
상태와 관련있는 컴포넌트틀의 render, addEvent, mount 함수가 순차적으로 실행됩니다.

다만 이렇게 변경하면 언제 값을 변경하나 추적하기 어려운 단점이 있습니다. 

setState()를 사용하는 방법도 있지만, ```Object.defineProperty```를 한번 써보고 싶어서 생략했습니다. 

##### 2. flex 패턴을 사용하지 않았습니다.

flex 패턴을 사용하면 단방향으로 데이터가 전달되고, 만약 값을 변경하려면 명시된 action을 사용하여서만 변경하기 때문에 
상태 관리가 쉽고 데이터 흐름을 잘 제어할수 있다는 장점이 있습니다.

다만, action이 늘어나면 관리가 힘들며 생산성이 줄어들고, 너무 구조적 제약이 심하다는 판단 하에 

flex 패턴을 사용하지 않았습니다.

다만 역시 이때도 상태가 언제 바뀌는지 추적하기 힘든 단점이 있습니다.

<br>



## 시작 방법

```
git clone https://github.com/lodado/boilerplate

cd boilerplate

npm install

npm run build (webpack dev build 시작)

npm start (express 시작)

```

윈도우라면 위 npm 2 명령어 대신(build, start)

```
npm run test
```
로 동시에 시작 가능

<br>

### 참고

https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/
