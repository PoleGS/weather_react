import {FETCH_STARTED, FETCH_FAILURE, FETCH_SUCCESS} from "./actionTypes";

export const fetchWeatherStarted = () => ({
    type: FETCH_STARTED
});

export const fetchWeatherSuccess = (result) => ({
    type: FETCH_SUCCESS,
    result
})

export const fetchWeatherFailure = (error) => ({
    type: FETCH_FAILURE,
    error
})

//异步action构造函数
export const fetchWeather = (cityCode) => {
    return (dispatch) => {
        const apiUrl = `/data/cityinfo/${cityCode}.html`;
        dispatch(fetchWeatherStarted());

        fetch(apiUrl).then( (response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get response with status' + response.status);
            }
            response.json().then((responseJson) => {
                dispatch(fetchWeatherSuccess(responseJson['weatherinfo']));
            }).catch((error) => {
                throw new Error('Invalid json response; '+ error);
            });
        }).catch((error) => {
            dispatch(fetchWeatherFailure(error));
        })
    };
}