<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="GeoFenceWorker" generation="1" functional="0" release="0" Id="37451eba-8c1a-456e-9f75-22dc7213f55c" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="GeoFenceWorkerGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="GeoFenceWorkerRole:Endpoint1" protocol="tcp">
          <inToChannel>
            <lBChannelMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/LB:GeoFenceWorkerRole:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="GeoFenceWorkerRole:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="">
          <maps>
            <mapMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/MapGeoFenceWorkerRole:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </maps>
        </aCS>
        <aCS name="GeoFenceWorkerRole:origin" defaultValue="">
          <maps>
            <mapMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/MapGeoFenceWorkerRole:origin" />
          </maps>
        </aCS>
        <aCS name="GeoFenceWorkerRole:uri" defaultValue="">
          <maps>
            <mapMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/MapGeoFenceWorkerRole:uri" />
          </maps>
        </aCS>
        <aCS name="GeoFenceWorkerRoleInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/MapGeoFenceWorkerRoleInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:GeoFenceWorkerRole:Endpoint1">
          <toPorts>
            <inPortMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRole/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapGeoFenceWorkerRole:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" kind="Identity">
          <setting>
            <aCSMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRole/Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </setting>
        </map>
        <map name="MapGeoFenceWorkerRole:origin" kind="Identity">
          <setting>
            <aCSMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRole/origin" />
          </setting>
        </map>
        <map name="MapGeoFenceWorkerRole:uri" kind="Identity">
          <setting>
            <aCSMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRole/uri" />
          </setting>
        </map>
        <map name="MapGeoFenceWorkerRoleInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRoleInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="GeoFenceWorkerRole" generation="1" functional="0" release="0" software="C:\Users\Uffe\Source\Repos\XSockets.Geo\GeoFenceWorker\csx\Debug\roles\GeoFenceWorkerRole" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaWorkerHost.exe " memIndex="-1" hostingEnvironment="consoleroleadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="tcp" portRanges="8080" />
            </componentports>
            <settings>
              <aCS name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="" />
              <aCS name="origin" defaultValue="" />
              <aCS name="uri" defaultValue="" />
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;GeoFenceWorkerRole&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;GeoFenceWorkerRole&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRoleInstances" />
            <sCSPolicyUpdateDomainMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRoleUpgradeDomains" />
            <sCSPolicyFaultDomainMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRoleFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyUpdateDomain name="GeoFenceWorkerRoleUpgradeDomains" defaultPolicy="[5,5,5]" />
        <sCSPolicyFaultDomain name="GeoFenceWorkerRoleFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="GeoFenceWorkerRoleInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="2389c14e-57eb-486f-9025-40645806902c" ref="Microsoft.RedDog.Contract\ServiceContract\GeoFenceWorkerContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="01f38c1f-d19c-4682-bc95-184e2be2e834" ref="Microsoft.RedDog.Contract\Interface\GeoFenceWorkerRole:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/GeoFenceWorker/GeoFenceWorkerGroup/GeoFenceWorkerRole:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>