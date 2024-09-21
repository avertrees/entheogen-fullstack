import { Download,  } from "@/utils/firebase";
import { NextResponse, NextRequest } from "next/server";

// def calculate_running_averages(array)
// arr = array.map.with_index do |val, id|
//   if id > 0 
//       pre_avg = array[id-1]
//       pre_sum = pre_avg * id
//       len = id+1
//       (val+pre_sum)/len
//   else 
//       val
//   end 
// end
// end

// #function to scale events between two numbers
// #reference - https://cycling74.com/forums/what's-the-math-behind-the-scale-object

// def scale(x, xmin, xmax, ymin, ymax)
// xrange = xmax - xmin
// yrange = ymax - ymin
// ymin + (x - xmin) * (yrange.to_f / xrange)     
// end

// #get trough and peak for each average value
// # p stats
// def get_relative_min_max(array)
//   min = 1.00000000000000000
//   max = 0.00000000000000000
//   arr = []
//   test = array.map.with_index do |val, id|
//       # relative_minimum = min
//       # relative_maximum = max

//       if  val < min 
//           min = val    
//       elsif val > max
//           max = val
//       elsif val == min && val == max 
//         min = val - 0.00000000000000001
//         max = val
//       end

//       r = scale(val, min, max, -160, -20)
//       d = scale(val, min, max, 300, 500)
//       n = scale(val, min, max, 20, 100)

      
//       {
//           average: val,
//           rel_min: min,
//           rel_max: max,
//           scaled_dist: d,
//           scaled_rad: r,
//           scaled_noise: n 
//           # scaled_dist: scale(val, min, max, 20, 600),
//           # scaled_rad: scale(val, min, max, -160, 100) 
//       }    
//   end
// end

// def eeg
// # byebug
//  response = RestClient.get self.data_file_url
//  orig_data = response.body
// # byebug
//  new_data = orig_data.gsub!("NaN", "0.0")
//  data = JSON.parse(new_data)
// gamma_relative_data = data["timeseries"]["gamma_relative"]["samples"]
// alpha_relative_data = data["timeseries"]["alpha_relative"]["samples"]
// beta_relative_data = data["timeseries"]["beta_relative"]["samples"]
// delta_relative_data = data["timeseries"]["delta_relative"]["samples"]
// theta_relative_data = data["timeseries"]["theta_relative"]["samples"]

// gamma_relative_averages = gamma_relative_data.map{|arr| arr.sum/arr.length }
// alpha_relative_averages = alpha_relative_data.map{|arr| arr.sum/arr.length } 
// beta_relative_averages = beta_relative_data.map{|arr| arr.sum/arr.length }
// delta_relative_averages = delta_relative_data.map{|arr| arr.sum/arr.length }
// theta_relative_averages = theta_relative_data.map{|arr| arr.sum/arr.length }

// gamma_running_averages = calculate_running_averages(gamma_relative_averages)
// alpha_running_averages = calculate_running_averages(alpha_relative_averages)
// beta_running_averages = calculate_running_averages(beta_relative_averages)
// delta_running_averages = calculate_running_averages(delta_relative_averages)
// theta_running_averages = calculate_running_averages(theta_relative_averages)

// gamma = get_relative_min_max(gamma_running_averages)
// alpha = get_relative_min_max(alpha_running_averages)
// beta = get_relative_min_max(beta_running_averages)
// delta = get_relative_min_max(delta_running_averages)
// theta = get_relative_min_max(theta_running_averages)

// json_data = {
//         alpha: alpha,
//         beta: beta,
//         delta: delta,
//         theta: theta,
//         gamma: gamma
// }
// end

// import { Download } from "@/utils/firebase";

function calculateRunningAverages(array: number[]): number[] {
  return array.map((val, id) => {
      if (id > 0) {
          const preAvg = array[id - 1];
          const preSum = preAvg * id;
          const len = id + 1;
          return (val + preSum) / len;
      } else {
          return val;
      }
  });
}

function scale(x: number, xmin: number, xmax: number, ymin: number, ymax: number): number {
  const xrange = xmax - xmin;
  const yrange = ymax - ymin;
  return ymin + (x - xmin) * (yrange / xrange);
}

interface RelativeMinMax {
  average: number;
  rel_min: number;
  rel_max: number;
  scaled_dist: number;
  scaled_rad: number;
  scaled_noise: number;
}

function getRelativeMinMax(array: number[]): RelativeMinMax[] {
  let min = 1.00000000000000000;
  let max = 0.00000000000000000;

  return array.map((val) => {
      if (val < min) {
          min = val;
      } else if (val > max) {
          max = val;
      } else if (val === min && val === max) {
          min = val - 0.00000000000000001;
          max = val;
      }

      const r = scale(val, min, max, -160, -20);
      const d = scale(val, min, max, 300, 500);
      const n = scale(val, min, max, 20, 100);

      return {
          average: val,
          rel_min: min,
          rel_max: max,
          scaled_dist: d,
          scaled_rad: r,
          scaled_noise: n
      };
  });
}

export function eeg(origData): Promise<any> {
  console.log("origData in eeg is: ", origData)

  // const response = await createReadStream(dataFileUrl.url) //fetch(dataFileUrl.url);
  // console.log("response in eeg is: ", response)
  // const origData = await response.json();
  const newData = origData.replace(/NaN/g, "0.0");
  const data = JSON.parse(newData);

  const gammaRelativeData = data["timeseries"]["gamma_relative"]["samples"];
  const alphaRelativeData = data["timeseries"]["alpha_relative"]["samples"];
  const betaRelativeData = data["timeseries"]["beta_relative"]["samples"];
  const deltaRelativeData = data["timeseries"]["delta_relative"]["samples"];
  const thetaRelativeData = data["timeseries"]["theta_relative"]["samples"];

  const gammaRelativeAverages = gammaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);
  const alphaRelativeAverages = alphaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);
  const betaRelativeAverages = betaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);
  const deltaRelativeAverages = deltaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);
  const thetaRelativeAverages = thetaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);

  const gammaRunningAverages = calculateRunningAverages(gammaRelativeAverages);
  const alphaRunningAverages = calculateRunningAverages(alphaRelativeAverages);
  const betaRunningAverages = calculateRunningAverages(betaRelativeAverages);
  const deltaRunningAverages = calculateRunningAverages(deltaRelativeAverages);
  const thetaRunningAverages = calculateRunningAverages(thetaRelativeAverages);

  const gamma = getRelativeMinMax(gammaRunningAverages);
  const alpha = getRelativeMinMax(alphaRunningAverages);
  const beta = getRelativeMinMax(betaRunningAverages);
  const delta = getRelativeMinMax(deltaRunningAverages);
  const theta = getRelativeMinMax(thetaRunningAverages);

  return {
      alpha: alpha,
      beta: beta,
      delta: delta,
      theta: theta,
      gamma: gamma
  };
}

// export async function eeg(uuid: string): Promise<any> {
//   const response = await Download(uuid);
//   console.log("response in eeg is: ", response)
//   const origData = await response.json();
//   const newData = origData.replace(/NaN/g, "0.0");
//   const data = JSON.parse(newData);

//   const gammaRelativeData = data["timeseries"]["gamma_relative"]["samples"];
//   const alphaRelativeData = data["timeseries"]["alpha_relative"]["samples"];
//   const betaRelativeData = data["timeseries"]["beta_relative"]["samples"];
//   const deltaRelativeData = data["timeseries"]["delta_relative"]["samples"];
//   const thetaRelativeData = data["timeseries"]["theta_relative"]["samples"];

//   const gammaRelativeAverages = gammaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);
//   const alphaRelativeAverages = alphaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);
//   const betaRelativeAverages = betaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);
//   const deltaRelativeAverages = deltaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);
//   const thetaRelativeAverages = thetaRelativeData.map((arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length);

//   const gammaRunningAverages = calculateRunningAverages(gammaRelativeAverages);
//   const alphaRunningAverages = calculateRunningAverages(alphaRelativeAverages);
//   const betaRunningAverages = calculateRunningAverages(betaRelativeAverages);
//   const deltaRunningAverages = calculateRunningAverages(deltaRelativeAverages);
//   const thetaRunningAverages = calculateRunningAverages(thetaRelativeAverages);

//   const gamma = getRelativeMinMax(gammaRunningAverages);
//   const alpha = getRelativeMinMax(alphaRunningAverages);
//   const beta = getRelativeMinMax(betaRunningAverages);
//   const delta = getRelativeMinMax(deltaRunningAverages);
//   const theta = getRelativeMinMax(thetaRunningAverages);

//   return {
//       alpha: alpha,
//       beta: beta,
//       delta: delta,
//       theta: theta,
//       gamma: gamma
//   };
// }
