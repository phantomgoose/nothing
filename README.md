## What's this?

Sample project with React front end and Go (golang) backend, to practice both a bit. Planning to also add a Node endpoint at some point.

This also contains a Docker file for container practice.

The resulting container image was ultimately pushed to AWS Elastic Container Repository (ECR) and provisioned into a service running on an Elastic Container Service cluster.

## Build instructions

### Prereqs

node, Docker, Go, AWS CLI (only for deployment to AWS)

### Docker

1. Start from repo root
2. `docker build -t nothing .` (this builds the client and Go server, and creates a docker image)
3. `docker run -p 80:80 nothing` (this runs the container locally)
4. Go to `http://localhost:80` to see the app in all its 1970s aesthetic glory.

### Local build (client)

1. `cd client`
2. `npm i && npm start`

### Local build (Go server)

1. `cd server`
2. `go build && ./nothing` or just `go run main.go` (if you get a port error, make sure your Docker container isn't running on the same port)

### Deploying Docker image to ECS

Full instructions here: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-authenticate-registry

1. Ensure your AWS account has necessary permissions for ECR (container registry). See here: https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html
2. Make sure AWS CLI is installed.
3. Authenticate Docker against ECR: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-authenticate-registry
4. Create repo if one doesnt exist already: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-create-repository
5. Push your Docker image to ECR: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-push-image
6. You should now see your repo and image in ECR: https://us-west-2.console.aws.amazon.com/ecr/repositories
7. Go to https://console.aws.amazon.com/ecs/home#/firstRun
8. Select `custom` container defition and click `Configure`
9. `Container name` should match the name of your container in ECR. `Image` should be the `Image URI` from ECR.
10. In `Port mappings` add port `80`.
11. Click `Update` to close the menu and click `Next` to move on to the next step.
12. Select `None` for load balancer and hit `Next`.
13. Use whatever you like for cluster name. Hit `Next`.
14. Review the finalized task and hit `Create`.
15. Wait for all the privisioning processes to finish (should only take a couple minutes).
16. When it's done, click `View service`.
17. Go to `Tasks` tab and click on your task id.
18. Copy the `Public IP` and paste it in the browser.
19. Yay.
