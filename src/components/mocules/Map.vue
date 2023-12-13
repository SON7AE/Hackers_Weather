<template>
    <div id="map"></div>
</template>

<script>
import KAKAO_API_KEY from "@/config/apiKey.js"
import mapAxis from "@assets/mapAxis.json"
import store from "@store/index"

export default {
    mounted() {
        // 카카오 디벨로퍼 API KEY
        const API_KEY = KAKAO_API_KEY

        if (window.kakao && window.kakao.maps) {
            this.initMap()
        } else {
            const script = document.createElement("script")
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap)
            script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}`
            document.head.appendChild(script)
        }
    },
    methods: {
        initMap() {
            const mapContainer = document.getElementById("map") // 지도를 표시할 div
            const mapOption = {
                center: new kakao.maps.LatLng(36.73035, 127.967487), // 지도의 중심좌표
                level: 13, // 지도의 확대 레벨
            }
            const map = new kakao.maps.Map(mapContainer, mapOption)
            const positions = mapAxis.map((pos) => ({
                latlng: new kakao.maps.LatLng(...pos.latlng),
                cityName: pos.cityName,
            }))
            // 마커를 생성합니다.
            positions.forEach((pos) => {
                const marker = new kakao.maps.Marker({
                    position: pos.latlng, // 마커의 위치
                })
                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map)
                kakao.maps.event.addListener(marker, "click", () => {
                    // 클릭한 위도, 경도 정보를 가져옵니다
                    // watch로 따로 빼지 않고, 직접 할당
                    const res = marker.getPosition()
                    const axis = {
                        lat: res.Ma,
                        lon: res.La,
                        cityName: pos.cityName,
                    }
                    store.dispatch("openWeatherApi/fetchApi", axis)
                    // store.FETCH_OPENWEATHER_API(res.Ma, res.La, pos.cityName)
                })
                // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
                // marker.setMap(null);
            })
        },
    },
}
</script>

<style lang="scss" scoped>
#map {
    width: 400px;
    height: 400px;

    border-radius: 16px;
    box-shadow: 0px 0px 24px 5px rgba(0, 0, 0, 0.1);
}
</style>
