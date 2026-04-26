import { TempUnit, WeatherCondition } from "@/context/WeatherContext";

export function formatTemp(temp: number, unit: TempUnit) {
  if (unit === "C") {
    const c = Math.round((temp - 32) * 5 / 9);
    return `${c}°`;
  }
  return `${temp}°`;
}

export function getWeatherIcon(condition: WeatherCondition): any {
  switch (condition) {
    case "sunny": return "sunny";
    case "cloudy": return "cloudy";
    case "partly-sunny": return "partly-sunny";
    case "rainy": return "rainy";
    case "thunderstorm": return "thunderstorm";
    case "snow": return "snow";
    case "clear-night": return "moon";
    case "cloudy-night": return "cloudy-night";
    default: return "sunny";
  }
}
