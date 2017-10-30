const containsVowel = word => {
  return !!word.match(/[aeiouy]/g);
};

const notEmpty = word => {
  const valid = !!word && word.length > 0 && !!word.match(/^.+/);
  console.log('valid: ', valid);
  return valid;
};

const lessThanTwentyCharacters = input => {
  return input.length <= 20;
};

const lessThanFiftyCharacters = input => {
  return input.length <= 50;
};

const lessThanTenThousandCharacters = input => {
  return input.length <= 10000;
};

const notEmptyAndLessThanTwentyCharacters = word => {
  return notEmpty(word) && lessThanTwentyCharacters(word);
};

const notEmptyAndLessThanFiftyCharacters = word => {
  return notEmpty(word) && lessThanFiftyCharacters(word);
};

const notEmptyAndLessThanTenThousandCharacters = word => {
  return notEmpty(word) && lessThanTenThousandCharacters(word);
};

const containsillegalCharacter = word => {
  return !!word.match(/\W/g);
};

const name = name => {
  return notEmpty(name) && containsVowel(name) && !containsillegalCharacter(name);
};

const email = email => {
  const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
  return emailRegex.test(email);
};

const password = password => {
  return password.length >= 6 && password.match(/\d+/g);
};

const validate = {
  firstname: name,
  lastname: name,
  notEmpty: notEmpty,
  email: email,
  password: password,
  lessThanTwentyCharacters: lessThanTwentyCharacters,
  lessThanFiftyCharacters: lessThanFiftyCharacters,
  lessThanTenThousandCharacters: lessThanTenThousandCharacters,
  notEmptyAndLessThanTwentyCharacters: notEmptyAndLessThanTwentyCharacters,
  notEmptyAndLessThanFiftyCharacters: notEmptyAndLessThanFiftyCharacters,
  notEmptyAndLessThanTenThousandCharacters: notEmptyAndLessThanTenThousandCharacters,
};

export default validate;
