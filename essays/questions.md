---
layout: essay
type: essay
title: "Insightful Inqueries"
# All dates must be YYYY-MM-DD format!
date: 2024-09-11
published: false
labels:
  - Stack Overflow
---

<style>
    .img {
        max-width: 73%;
        height: auto;
        display: block;
        margin: 0 auto;
        padding: 9px;
        border-radius: 8px;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
    }
</style>

<br>

<img class="img" src="../img/stackoverflow/stackoverflow.png">

<br>
 
Everyone has questions when they are in the middle of programming, whether it's a bug in the code, an internal server error, or a conceptual question. People often turn to platforms like StackOverflow, where millions of tech users go for help. 

Nonetheless, after scrolling through multiple sections, I realized just how unclear and confusing some questions are, which results in a flurry of downvotes. I have also written a few unclear questions on StackOverflow myself. This is why it is vital to ask smart questions. 

## Why Smart Questions?

According to Rick Moen, "The kind of answers you get to your technical questions depends as much on the way you ask the questions as on the difficulty of developing the answer." In short, straightforward and detailed questions will result in straightforward and detailed answers. 

However, before asking questions to others, it is important to do some work for yourself. 

### For example...
1. Search for answers on Google (maybe your question is already answered elsewhere)
2. Check the official website's documentation
3. Run some tests or check your code
4. Ask a GenAI AI chatbot (may provide an answer or lead you on the right path)

## What Constitutes a Smart Question?

#### Being Clear and Concise:

- Make sure to get to the point quickly but clearly, with enough detail about the issue or context.

#### Be Detailed:

- Provide as much detail as possible about the problem, including relavent background information such as code examples or versioning.

#### Use Common Etiquette:

- Always use proper grammar practices, punctuation, and capitalization. Don't include code blocks that are too lengthy or too short and uninformative.

## A Smart Question:

##### Here's an example of a smart question from [Stack Overflow](https://stackoverflow.com/questions/40526102/how-do-you-format-a-date-time-in-typescript):

### How do you format a Date/Time in TypeScript?

"I have a class Module which is defined as:

```js
export class Module {

    constructor(public id: number, public name: string, public description: string, 
                 public lastUpdated: Date, public owner: string) { }

    getNiceLastUpdatedTime(): String {

        let options: Intl.DateTimeFormatOptions = {
            day: "numeric", month: "numeric", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        };

        return this.lastUpdated.toLocaleDateString("en-GB", options) + " " + this.lastUpdated.toLocaleTimeString("en-GB", options);
    }
}
```

When I call the method with the following code:

```js
let date = new Date(1478708162000); // 09/11/2016 16:16pm (GMT)
let module = new Module(1, "Test", "description", date, "test owner");
console.log(module.getNiceLastUpdatedTime());
```

I end up with the following printed in the console:

```9 November 2016 16:16:02 GMT```


What I want to see is:

```09/11/2015 16:16```

I've had a look at the documentation at: [Mozilla Docs URL](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) and I still can't see what I'm doing wrong (I know this is a JavaScript API documentation but I'm pretty sure that's what TypeScript is using under the hood)."

___


Although not perfect...

What I like about this question is that it provides specific context on the ```Module``` Class and how the user is trying to solve the problem. 

Additionally, I think the "Expected" vs "Actual" answer is important to understanding the problem and what output is wanted. 

Lastly, linking the documentation shows initial research was done, and that the question was not asked without proper research first.


## A Questionable Question:

Here's an example of a lower-effort question from [Stack Overflow](https://stackoverflow.com/questions/78971181/what-should-i-do-for-this-log-in-problem):

### what should i do for this log in problem?

"In my project, there are three user such as student, faculty and admin. I have one log in form when i log in as student i want to go student profile page, when i log in as faculty i want to go take attendance page ,when i log in as admin i want to go admin page. But I can't go as my with what should I do so that after log in I can go my expected page?

I tried to create three log in page for 3 types of users? those log in page i linked my expected page. But I was not successful . Is this right way?"

___


Unfortunately, this question is not perfect.

Some context is shown in the question, but no code or documentation is provided. The question is a little too vague and does not directly relate to ```PHP```, where it was tagged. 

Additionally, there are a number of issues with correct grammar and punctuation. Although perfect grammar isn't a requirement, using incorrect capitalization and punctuation shows a lack of effort put into the question, and viewers may not take the question as seriously.


## Wrap Up:

After reading through many Stack Overflow posts and questions, as well as Rick Moen's guide, I better understand how to communicate effectively with other developers through forums no matter what the platform is.

Writing clear, concise, and detailed questions will increase the chances of getting a insightful response. By following the mentioned principles, I can keep my questions on the right track.

