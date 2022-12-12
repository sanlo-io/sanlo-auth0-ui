export const rules = {
	"name": "PasswordStrengthError",
	"message": "Password is too weak",
	"code": "invalid_password",
	"description": {
		"rules": [{
			"message": "At least %d characters in length",
			"format": [8],
			"code": "lengthAtLeast",
			"verified": true
		}, {
			"message": "Contain at least %d of the following %d types of characters:",
			"code": "containsAtLeast",
			"format": [3, 4],
			"items": [{
				"message": "lower case letters (a-z)",
				"code": "lowerCase",
				"verified": true
			}, {
				"message": "upper case letters (A-Z)",
				"code": "upperCase",
				"verified": false
			}, {
				"message": "numbers (i.e. 0-9)",
				"code": "numbers",
				"verified": false
			}, {
				"message": "special characters (e.g. !@#$%^&*)",
				"code": "specialCharacters",
				"verified": false
			}],
			"verified": false
		}],
		"verified": false
	},
	"policy": "* At least 8 characters in length\n* Contain at least 3 of the following 4 types of characters:\n * lower case letters (a-z)\n * upper case letters (A-Z)\n * numbers (i.e. 0-9)\n * special characters (e.g. !@#$%^&*)",
	"statusCode": 400
};
