
// 假设 useDateFormat 已经正确处理时间和返回数字或可转换为数字的字符串
// 假设 img 对象中的所有属性都是预定义且正确的

// 使用 enum 来管理天气状况
enum WeatherConditions {
  Sunny = '晴',
  Cloudy = '多云',
  NightCloudy = '少云',
  CloudyDay = '阴',
  Shower = '阵雨',
  ThundershowersSunny = '雷阵雨',
  SleetRain = '雨夹雪',
  Rain = '雨',
  HeavyRain = '大雨',
  Foggy = '霾',
  Dust = '浮尘',
  Sleet = '冻雨',
  Snow = '雪',
  Snowstorm = '暴雪',
  HeavySnow = '大雪',
  Sand = '扬沙',
  Sandstorm = '沙尘暴',
  Tornado = '龙卷风',
  Wind = '风',
  Undefined = 'undefind',
}

const img = {
  "Cloudy": "/icon/weather/Cloudy.svg",
  "CloudyDay": "/icon/weather/CloudyDay.svg",
  "Dust": "/icon/weather/Dust.svg",
  "Foggy": "/icon/weather/Foggy.svg",
  "HeavyRain": "/icon/weather/HeavyRain.svg",
  "HeavySnow": "/icon/weather/HeavySnow.svg",
  "PartlyCloudy": "/icon/weather/PartlyCloudy.svg",
  "Rain": "/icon/weather/Rain.svg",
  "RainSnow": "/icon/weather/RainSnow.svg",
  "Sand": "/icon/weather/Sand.svg",
  "Sandstorm": "/icon/weather/Sandstorm.svg",
  "Shower": "/icon/weather/Shower.svg",
  "Sleet": "/icon/weather/Sleet.svg",
  "SleetRain": "/icon/weather/SleetRain.svg",
  "Snow": "/icon/weather/Snow.svg",
  "Snowstorm": "/icon/weather/Snowstorm.svg",
  "Sunny": "/icon/weather/Sunny.svg",
  "ThundershowersSunny": "/icon/weather/ThundershowersSunny.svg",
  "Thunderstorm": "/icon/weather/Thunderstorm.svg",
  "Tornado": "/icon/weather/Tornado.svg",
  "Wind": "/icon/weather/Wind.svg",
  "nightImg": {
    "Cloudy": "/icon/weather/NightCloudy.svg",
    "LessCloudy": "/icon/weather/NightLessCloudy.svg",
    "Sunny": "/icon/weather/NightSunny.svg",
  },
  "undefined": "/icon/weather/undefined.svg",
};




export function handleWeatherUrl(...args: any): string {
  const [data, isdark] = args;

  // 使用对象映射来代替 switch 语句，提高查找效率和可维护性
  const weatherImgMap: any = {
    [WeatherConditions.Sunny]: isdark ? img.nightImg.Sunny : img.Sunny,
    [WeatherConditions.Cloudy]: isdark ? img.nightImg.Cloudy : img.Cloudy,
    [WeatherConditions.NightCloudy]: isdark ? img.nightImg.Cloudy : img.Cloudy,
    [WeatherConditions.CloudyDay]: img.CloudyDay,
    [WeatherConditions.Shower]: img.Shower,
    [WeatherConditions.ThundershowersSunny]: img.ThundershowersSunny,
    [WeatherConditions.SleetRain]: img.SleetRain,
    [WeatherConditions.Rain]: img.Rain,
    [WeatherConditions.HeavyRain]: img.HeavyRain,
    [WeatherConditions.Foggy]: img.Foggy,
    [WeatherConditions.Dust]: img.Dust,
    [WeatherConditions.Sleet]: img.Sleet,
    [WeatherConditions.Snow]: img.Snow,
    [WeatherConditions.Snowstorm]: img.Snowstorm,
    [WeatherConditions.HeavySnow]: img.HeavySnow,
    [WeatherConditions.Sand]: img.Sand,
    [WeatherConditions.Sandstorm]: img.Sandstorm,
    [WeatherConditions.Tornado]: img.Tornado,
    [WeatherConditions.Wind]: img.Wind,
    [WeatherConditions.Undefined]: img.undefined, // 确保这是定义好的
  };

  const selectedImage = weatherImgMap[data.weather] || img.undefined;
  return selectedImage
}


export default handleWeatherUrl;
