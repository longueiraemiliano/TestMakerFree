import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "question-edit",
    templateUrl: './question-edit.component.html',
    styleUrls: ['./question-edit.component.css']
})

export class QuestionEditComponent {
    title: string;
    question: Question;
    form: FormGroup;

    // this will be TRUE when editing an existing question, 
    // FALSE when creating a new one.
    editMode: boolean;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,
        private fb: FormBuilder) {

        this.createForm();

        // create an empty object from the Quiz interface
        this.question = <Question>{};

        var id = +this.activatedRoute.snapshot.params["id"];

        // check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

        if (this.editMode) {

            // fetch the quiz from the server
            var url = this.baseUrl + "api/question/" + id;
            this.http.get<Question>(url).subscribe(res => {
                this.question = res;
                this.title = "Edit - " + this.question.Text;
                this.updateForm();
            }, error => console.error(error));
        }
        else {
            this.question.QuizId = id;
            this.title = "Create a new Question";
        }
    }

    onSubmit() {
        var url = this.baseUrl + "api/question";

        var tempQuestion = <Question>{};
        tempQuestion.QuizId = this.question.QuizId;
        tempQuestion.Text = this.form.value.Text;

        if (this.editMode) {
            tempQuestion.Id = this.question.Id;
            this.http
                .post<Question>(url, tempQuestion)
                .subscribe(res => {
                    var v = res;
                    console.log("Question " + v.Id + " has been updated.");
                    this.router.navigate(["quiz/edit", v.QuizId]);
                }, error => console.log(error));
        } else {
            this.http
                .put<Question>(url, tempQuestion)
                .subscribe(res => {
                    var v = res;
                    console.log("Question " + v.Id + " has been created.");
                    this.router.navigate(["quiz/edit", v.QuizId]);
                }, error => console.log(error));
        }
    }

    createForm() {
        this.form = this.fb.group({
            Text : ['', Validators.required]
        });
    }

    updateForm() {
        this.form.setValue({
            Text: this.question.Text,
            QuizId: this.question.QuizId
        });
    }

    getFormControl(name: string) {
        return this.form.get(name);
    }

    isChanged(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }

    isValid(name: string) {
        var e = this.getFormControl(name);
        return e && (e.valid);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return this.isChanged(name) && !this.isValid(name);
    }

    onBack() {
        this.router.navigate(["quiz/edit", this.question.QuizId]);
    }
}