import isEmpty from 'lodash/isEmpty';

class Validator {
  /**
   * Check if input is digit
   * @method isDigit
   * @param {int} number
   * @returns {boolean} -
   */
  isDigit(number) {
    if (isNaN(parseInt(number, 10))) return false;
    return true;
  }

  newPost(body) {
    this.errors = {};
    if (!body.title) {
      this.errors.title = 'TItle is required';
    }
    if (!body.location) {
      this.errors.location = 'Location is required'
    }
    if (!body.excerpt) {
      this.errors.excerpt = 'Excerpt is required'
    }
    if (!body.content) {
      this.errors.content = 'Content is required'
    }
    const errors = this.errors;
    return {
      isValid: isEmpty(errors),
      errors
    }
  }

  newTrace(body) {
    this.errors = {};
    if (!body.name) {
      this.errors.name = 'Trace name is required';
    }
    if (!body.location) {
      this.errors.location = 'Location is required'
    }
    if (!body.imageUrl) {
      this.errors.imageUrl = 'Image url is required'
    }
    if (!body.description) {
      this.errors.description = 'Description is required'
    }
    const errors = this.errors;
    return {
      isValid: isEmpty(errors),
      errors
    }
  }

}

export default new Validator();