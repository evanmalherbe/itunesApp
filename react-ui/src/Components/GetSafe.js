/* I was getting type errors like this: "Uncaught TypeError: Cannot read property ‘propertyName’ of undefined", so I learned to use the following function to safely check if the value I got from the api is
undefined or not. This, coupled with an if statement for each value (e.g. trackname, artistname etc),
fixed the error by letting me put placeholder values (or a placeholder image) in the results list if
something was undefined.

Learned this from here:
https://wanago.io/2018/03/12/defining-the-undefined-a-try-catch-trick/ */

function GetSafe(props) {
  try {
    return props.request();
  } catch (e) {
    return undefined;
  }
}

// Export component to be used in other files
export default GetSafe;
