sudo apt update
sudo apt install docker.io -y 
sudo apt install docker-compose -y

# install microsoft signing key
curl -sL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc.gpg > /dev/null

# add azure cli software repo
AZ_REPO=$(lsb_release -cs)
echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | sudo tee /etc/apt/sources.list.d/azure-cli.list

# install azure cli
sudo apt-get update
sudo apt-get install azure-cli

# install vsts-agent
mkdir /vsts-agent;cd /vsts-agent;curl -fkSL -o vstsagent.tar.gz https://vstsagentpackage.azureedge.net/agent/2.149.2/vsts-agent-linux-x64-2.149.2.tar.gz;tar -zxvf vstsagent.tar.gz; 
./config.sh --deploymentgroup --deploymentgroupname "default" --addDeploymentGroupTags --replace --deploymentGroupTags signalr --acceptteeeula --agent $HOSTNAME --url https://dev.azure.com/staffordwilliams/ --work _work --projectname 'digitalicebreakers' --auth PAT --token tb7bogiv3yww42umfdoh55iitrj2kxqhanwigp4gw4qqszr25owa --runasservice; sudo ./svc.sh install; sudo ./svc.sh start; 


# launch the contanier
az login --identity
sudo az acr login --name stafford
sudo docker stop digital-icebreakers || true && sudo docker rm digital-icebreakers || true
sudo docker run -d --name digital-icebreakers -p "80:80" --restart always stafford.azurecr.io/digitalicebreakers
