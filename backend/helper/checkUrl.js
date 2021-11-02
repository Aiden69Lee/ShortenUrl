exports.checkUrl = (str) => {
  try {
    const url_str = new URL(str);
    if (url_str.protocol === "http:" || url_str.protocol === "https:")
      return url_str;
    else
      false;
  }
  catch {
    return false;
  }
}