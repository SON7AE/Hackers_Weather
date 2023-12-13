import axios from "axios"

export default {
    // namespaced: 하나의 store에서 모듈화하여 사용될 수 있음을 명시적으로 나타내는 개념
    namespaced: true,
    // state: 실제로 취급하는 데이터
    state: {
        cityName: "",
        current: {
            temp: "", // 현재온도
            desc: "", // 날씨묘사
            icon: "", // 날씨아이콘
            barometer: "", // 기압
            feelsLike: "", // 체감온도
            humidity: "", // 습도
            uvi: "", // 자외선 수치
        },
        hourly: [], // 시간대별 날씨 데이터
    },
    getters: {},
    mutations: {},
    actions: {
        // actions에서는 mutaions처럼 state를 바로 불러올 순 없다.
        // context라는 객체데이터를 가지고 와서, context를 참조하여 데이터를 불러온다.
        // context에는 state, getters, mutations를 활용할 수 있는 데이터를 담고있다.
        // mutations를 불러오기 위해선(접근하기 위해선) context.mutations가 아니라 context.commit을 활용한다.
        // ----------------------------------------------------------------------------------------------------
        // 객체구조분해 방법으로 불러올 수 있다.
        // ex) functionName({context})
        // context.state, context.getters, context.commit
        // ----------------------------------------------------------------------------------------------------
        // ex) functionName({ state, getters, commit }, payload) {}
        // 함수가 실행될 때, 두 번째 매개변수 자리는 인수로 들어온 특정한 데이터를 payload라는 이름으로 받는다.

        async fetchApi({ state }, payload) {
            const API_KEY = "284bfdeb630520653864189833ba7c68"
            // 위도 경도 좌표 변수
            let axisLat = payload.lat
            let axisLon = payload.lon

            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${axisLat}&lon=${axisLon}&appid=${API_KEY}&units=metric`)
                const data = res.data
                const current = res.data.current
                const hourly = res.data.hourly

                // 데이터 설정
                // state.cityName = data.timezone.split("/")[1] // 테스트 코드
                state.cityName = payload.cityName
                state.current.temp = Math.floor(current.temp)
                state.current.desc = current.weather[0].description
                state.current.barometer = current.pressure
                state.current.feelsLike = current.feels_like
                state.current.humidity = current.humidity
                state.current.uvi = current.uvi
                state.current.icon = current.weather[0].icon
                state.hourly = hourly.splice(23, hourly.length - 1)
            } catch (error) {
                console.log(error)
            }
        },
    },
}
