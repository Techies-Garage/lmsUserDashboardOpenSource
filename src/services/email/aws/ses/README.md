Using AWS CLI For SES :
___

### Converting html email to ecaped json:
[FreeFormatter.com]('https://www.freeformatter.com/json-escape.html#before-output')

### Viewing a list of email templates : 
`aws ses list-templates`

### Viewing the contents of a specific email template : 
```aws ses get-template --template-name MyTemplate```

### Create : 
```aws ses create-template --cli-input-json file://mytemplate.json```

### Update : 
```aws ses update-template --cli-input-json file://path/to/update_template.json```

### Delete : 
```aws ses delete-template --template-name MyTemplate```

### Example Command template :
```aws ses create-template --cli-input-json file://betakopa-signup-email.json```